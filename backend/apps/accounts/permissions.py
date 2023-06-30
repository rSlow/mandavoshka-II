from typing import Any

from channels.consumer import AsyncConsumer
from djangochannelsrestframework.permissions import IsAuthenticated as DefaultIsAuthenticated


class IsAuthenticated(DefaultIsAuthenticated):
    async def can_connect(self,
                          scope: {str, Any},
                          consumer: AsyncConsumer,
                          message=None) -> bool:
        return await self.has_permission(
            scope=scope,
            consumer=consumer,
            action=""  # it's not important to select the action
        )
