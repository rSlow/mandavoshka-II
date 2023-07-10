from channels.db import database_sync_to_async
from djangochannelsrestframework.decorators import action as consumer_action
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
from djangochannelsrestframework.permissions import IsAuthenticated
from rest_framework import status

from .. import models, serializers


class GamesListConsumer(GenericAsyncAPIConsumer):
    serializer_class = serializers.GameInListSerializer
    permission_classes = [IsAuthenticated]

    COMMON_GROUP_NAME = 'games_list'

    async def connect(self):
        await super().connect()
        await self.channel_layer.group_add(self.COMMON_GROUP_NAME, self.channel_name)
        await self.notify()
        await self.send_game_to_return()

    async def disconnect(self, code):
        await super().disconnect(code=code)
        await self.channel_layer.group_discard(self.COMMON_GROUP_NAME, self.channel_name)

    async def notify(self):
        await self.channel_layer.group_send(
            group=self.COMMON_GROUP_NAME,
            message={
                'type': 'send_games',
                'games': await self.get_all_games()
            }
        )

    async def send_games(self, event):
        await self.reply(
            action=event["type"],
            data=event["games"],
        )

    async def send_game_to_return(self):
        user_id = self.user_id
        game_to_return = await self.get_game_to_return(user_id=user_id)
        await self.reply(
            action="game_to_return",
            data=game_to_return,
        )

    @property
    def user_id(self) -> int:
        return self.scope["user"].id

    # ----- ACTIONS ----- #

    @consumer_action()
    async def create_game(self, **__):
        user_id = self.user_id
        game = await self.db_create_game(user_id=user_id)
        await self.notify()
        return game, status.HTTP_200_OK

    @consumer_action()
    async def join_game(self, game_id: int, **__):
        user_id = self.user_id
        game = await self.db_join_game(
            user_id=user_id,
            game_id=game_id
        )
        return game, status.HTTP_200_OK

    @consumer_action()
    async def return_to_game(self, game_id: int, action: str, request_id: int, **__):
        user_id = self.user_id
        try:
            player = await models.GamePlayer.objects.aget(game_id=game_id, user_id=user_id)
            if player:
                game = await models.Game.objects.aget(id=game_id)
                return self.serializer_class(game).data, status.HTTP_200_OK
        except models.GamePlayer.DoesNotExist:
            await self.reply(
                action=action,
                request_id=request_id,
                status=status.HTTP_400_BAD_REQUEST,
                errors=["Пользователь в данной игре не зарегистрирован"]
            )
        except models.Game.DoesNotExist:
            await self.reply(
                action=action,
                request_id=request_id,
                status=status.HTTP_400_BAD_REQUEST,
                errors=["Игра не существует"]
            )

    # ----- DATABASE CRUD ----- #
    async def db_create_game(self, user_id: int):
        # if await models.GamePlayer.objects.filter(user_id=user_id).aexists():
        #     raise IntegrityError
        game = await models.Game.objects.acreate()
        await models.GamePlayer.objects.acreate(
            user_id=user_id,
            game_id=game.id
        )
        return self.serializer_class(game).data

    async def db_join_game(self, user_id: int, game_id: int):
        game = await models.Game.objects.aget(id=game_id)
        await models.GamePlayer.objects.acreate(
            user_id=user_id,
            game_id=game_id
        )
        return self.serializer_class(game).data

    @staticmethod
    async def get_game_to_return(user_id: int):
        try:
            player = await models.GamePlayer.objects.aget(user_id=user_id)
            return int(player.game_id)
        except models.GamePlayer.DoesNotExist:
            return None

    @database_sync_to_async
    def get_all_games(self):
        games = models.Game.objects.all()
        return [self.serializer_class(game).data for game in games]
