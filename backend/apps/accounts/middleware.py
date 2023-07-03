from datetime import datetime

import jwt
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser

from django.db import close_old_connections
from rest_framework_simplejwt.settings import api_settings as jwt_settings

User = get_user_model()


class TokenExpired(Exception):
    pass


class JwtAuthMiddlewareStack(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        close_old_connections()

        try:
            token_key = (dict((x.split('=') for x in scope['query_string'].decode().split("&")))).get('token', None)
            payload = jwt.decode(token_key, jwt_settings.SIGNING_KEY, algorithms=jwt_settings.ALGORITHM)
            token_exp = datetime.fromtimestamp(payload['exp'])
            if token_exp < datetime.utcnow():
                raise TokenExpired
            user = await database_sync_to_async(User.objects.get)(id=payload['user_id'])
        except (jwt.exceptions.DecodeError, User.DoesNotExist, TokenExpired):
            user = AnonymousUser()

        scope['user'] = user
        return await super().__call__(scope, receive, send)
