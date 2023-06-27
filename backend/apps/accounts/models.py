from django.contrib.auth.models import AbstractUser
from django.db import models

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
