from typing import Any

from channels.consumer import AsyncConsumer
from djangochannelsrestframework.permissions import IsAuthenticated
from . import models


class IsPlayersGame(IsAuthenticated):
    @staticmethod
    def _get_game_id(scope: {str, Any}):
        return scope["url_route"]["kwargs"]["id"]

    async def has_permission(self, scope: {str, Any}, consumer: AsyncConsumer, **kwargs):
        user = scope.get("user")

        if user and user.pk and user.is_authenticated:
            player_exist = await models.GamePlayer.objects.filter(
                user_id=user.id, game_id=self._get_game_id(scope)
            ).aexists()

            if player_exist:
                return True

        return False

    async def can_connect(self, scope: {str, Any}, consumer: AsyncConsumer, message=None):
        return await self.has_permission(
            scope=scope,
            consumer=consumer,
        )
