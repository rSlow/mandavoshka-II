from django.contrib.auth import get_user_model
from channels.middleware import BaseMiddleware

from django.db import close_old_connections

User = get_user_model()


class JwtAuthMiddlewareStack(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        close_old_connections()
        try:
            token_key = (dict((x.split('=') for x in scope['query_string'].decode().split("&")))).get('token', None)
        except ValueError:
            token_key = None
        scope['user'] = await User.get_from_token(token_key)
        return await super().__call__(scope, receive, send)
