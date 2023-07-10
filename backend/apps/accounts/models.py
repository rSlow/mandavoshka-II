from django.contrib.auth.models import AbstractUser
from django.db import models


class RestUser(AbstractUser):
    class SexChoices(models.TextChoices):
        MAN = "M", "Мужской"
        WOMAN = "W", "Женский"

    sex = models.CharField(
        max_length=1,
        choices=SexChoices.choices,
        verbose_name="Пол",
        null=True,
        blank=True,
    )
