from django.db import models


class Game(models.Model):
    class GameStatus(models.TextChoices):
        CREATED = "created", "Создана"
        READY = "ready", "Готова"
        STARTED = "started", "Запущена"
        PAUSED = "paused", "Приостановлена"
        ENDED = "ended", "Закончена"

    created_time = models.DateTimeField(
        verbose_name="Время создания",
        auto_now_add=True,
    )
    status = models.CharField(
        verbose_name="Статус",
        max_length=10,
        choices=GameStatus.choices,
        default=GameStatus.CREATED,
    )
    current_player_id = models.IntegerField(
        verbose_name="ID текущего игрока",
        null=True,
        blank=True,
    )
    current_move_dt_start = models.DateTimeField(
        verbose_name="Время начала текущего хода",
        null=True,
        blank=True,
    )
    _room_name = models.CharField(
        verbose_name="Название комнаты",
        null=True,
        blank=True,
        max_length=100
    )

    @property
    def room_name(self):
        if self._room_name is None:
            return f"Комната № {self.pk}"
        return self._room_name

    @room_name.setter
    def room_name(self, value: str):
        self._room_name = value

    class Meta:
        verbose_name = "игра"
        verbose_name_plural = "игры"


class GamePlayer(models.Model):
    class GamePlace(models.IntegerChoices):
        FIRST = 1, "1"
        SECOND = 2, "2"
        THIRD = 3, "3"
        FOURTH = 4, "4"

    user = models.OneToOneField(
        to="accounts.RestUser",
        on_delete=models.SET_NULL,
        verbose_name="Пользователь",
        related_name="player",
        null=True,
    )
    game = models.ForeignKey(
        to="Game",
        on_delete=models.CASCADE,
        related_name="players",
        verbose_name="Игра",
    )
    is_connected = models.BooleanField(
        verbose_name="Подключен",
        default=False,
    )
    game_place = models.IntegerField(
        verbose_name="Игровой номер",
        choices=GamePlace.choices,
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = "игрок"
        verbose_name_plural = "игроки"


class GameChipModel(models.Model):
    owner_player = models.ForeignKey(
        to="GamePlayer",
        on_delete=models.SET_NULL,
        verbose_name="Игрок-родитель",
        related_name="own_chips",
        null=True,
    )
    keeper_player = models.ForeignKey(
        to="GamePlayer",
        on_delete=models.SET_NULL,
        verbose_name="Игрок-держатель",
        related_name="keep_chips",
        null=True,
    )
    x_coord = models.IntegerField(
        verbose_name="Координата X",
        null=True,
        blank=True,
    )
    y_coord = models.IntegerField(
        verbose_name="Координата Y",
        null=True,
        blank=True,
    )
    on_board = models.BooleanField(
        verbose_name="На доске",
        default=False,
    )

    class Meta:
        verbose_name = "фишка"
        verbose_name_plural = "фишки"
