from datetime import datetime
from typing import Self

import jwt
from channels.db import database_sync_to_async
from django.contrib.auth.models import AbstractUser, AnonymousUser
from django.db import models
from rest_framework_simplejwt.settings import api_settings as jwt_settings

SexChoices = [
    ("W", "Женский"),
    ("M", "Мужской"),
]


class RestUser(AbstractUser):
    sex = models.CharField(
        max_length=1,
        choices=SexChoices,
        verbose_name="Пол",
        null=True,
        blank=True,
    )

    @classmethod
    @database_sync_to_async
    def get_from_token(cls, token) -> Self | AnonymousUser:
        try:
            payload = jwt.decode(token, jwt_settings.SIGNING_KEY, algorithms=jwt_settings.ALGORITHM)
        except jwt.exceptions.DecodeError:
            return AnonymousUser()

        token_exp = datetime.fromtimestamp(payload['exp'])
        if token_exp < datetime.utcnow():
            return AnonymousUser()

        try:
            user = cls.objects.get(id=payload['user_id'])
        except cls.DoesNotExist:
            return AnonymousUser()

        return user
