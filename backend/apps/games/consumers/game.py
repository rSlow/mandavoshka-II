from djangochannelsrestframework.decorators import action as consumer_action
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
from rest_framework import status

from .. import models, serializers, permissions


class GameDetailConsumer(GenericAsyncAPIConsumer):
    serializer_class = serializers.GameDetailSerializer
    permission_classes = [permissions.IsPlayersGame]
    queryset = models.Game.objects.all()

    async def connect(self):
        await super().connect()

        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.set_player_connection(is_connected=True)
        await self.notify()

    async def disconnect(self, code):
        await super().disconnect(code=code)

        await self.channel_layer.group_discard(self.group_name, self.channel_name)
        await self.set_player_connection(is_connected=False)
        await self.notify()

    # ----- NOTIFY GAME ----- #
    async def notify(self):
        await self.channel_layer.group_send(
            group=self.group_name,
            message={
                'type': 'send_game_data',
                'games': await self.get_game_data()
            }
        )

    async def send_game_data(self, event):
        await self.reply(
            action=event["type"],
            data=event["games"],
        )

    # ----- PROPS ----- #

    @property
    def group_name(self):
        game_id = self.game_id
        return f'game__{game_id}'

    @property
    def game_id(self):
        return self.scope["url_route"]["kwargs"]["id"]

    @property
    def user_id(self) -> int:
        return self.scope["user"].id

    # ----- ACTIONS ----- #

    @consumer_action()
    async def move_chip(self, **__):
        return {}, status.HTTP_200_OK

    @consumer_action()
    async def redeem_chip(self, **__):
        return {}, status.HTTP_200_OK

    @consumer_action()
    async def return_chip_from_center(self, **__):
        return {}, status.HTTP_200_OK

    # ----- DATABASE ----- #
    async def set_player_connection(self, is_connected: bool):
        user_id = self.user_id
        await models.GamePlayer.objects.filter(user_id=user_id).aupdate(is_connected=is_connected)

    # @staticmethod
    async def get_game_data(self):
        game = await self.queryset.prefetch_related(
            "players"
        ).prefetch_related(
            "players__keep_chips"
        ).prefetch_related(
            "players__own_chips"
        ).aget(
            id=self.game_id
        )
        return self.serializer_class(game).data
