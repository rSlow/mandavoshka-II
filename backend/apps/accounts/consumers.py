from functools import wraps

from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from djangochannelsrestframework import mixins
from djangochannelsrestframework.decorators import action as consumer_action
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
from djangochannelsrestframework.observer import model_observer
from djangochannelsrestframework.permissions import IsAuthenticated
from rest_framework import status

from .serializers import UserSerializer

User = get_user_model()


def force_database_sync_to_async(func):
    @wraps(func)
    def inner(*args, **kwargs):
        queryset = func(*args, **kwargs)
        return list(queryset)

    return database_sync_to_async(inner)


class UserConsumer(mixins.ListModelMixin,
                   GenericAsyncAPIConsumer):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    groups = ['users']

    async def connect(self):
        await super().connect()
        await self.channel_layer.group_add("users", self.channel_name)
        await self.user_change.subscribe(user_id=1)

    async def disconnect(self, code):
        await super().disconnect(code=code)
        await self.channel_layer.group_discard("users", self.channel_name)
        await self.user_change.unsubscribe(user_id=1)

    @consumer_action()
    async def list_staff(self, **_):
        list_staff = await self.get_list_staff()
        return list_staff, status.HTTP_200_OK

    @database_sync_to_async
    def get_list_staff(self):
        return [self.serializer_class(user).data for user in self.queryset.filter(is_staff=True)]

    async def notify_users(self):
        for group in self.groups:
            await self.channel_layer.group_send(
                group=group,
                message={
                    'type': 'update_users',
                    'users': await self.get_all_users()
                }
            )

    async def update_users(self, event: dict):
        await self.reply(
            action=event["type"],
            data=event["users"]
        )

    @database_sync_to_async
    def get_all_users(self):
        return [self.serializer_class(user).data for user in self.queryset]

    @model_observer(User, serializer_class=UserSerializer)
    async def user_change(self,
                          serialized_data: dict,
                          message_type: str,
                          action: str,
                          **__):
        """
        Отправка сериализованных данных всем подписанным соединениям.
        В kwargs дополнительно приходит observer и имя группы
        """
        await self.reply(
            action=f"{message_type}.{action}",
            data=serialized_data
        )

    @user_change.groups_for_consumer
    def user_change(self, user_id: int = None, **__):
        """
        Сюда можно передавать любые параметры в методе subscribe, для формирования групп отслеживания.
        Метод unsubscribe должен содержать те же параметры, для полной отписки от отслеживания (наверное)
        В kwargs приходит consumer
        """
        if user_id is not None:
            yield f'user_id__{user_id}'

    @user_change.groups_for_signal
    def user_change(self, instance: User, **__):
        """
        :param instance: Отслеживаемая модель, у которой берется необходимое поле для формирования имени группы.
                         Сравнение производится с именем группы, на которую подписано соединение

        Если группа валидна, instance прокинется далее в serializer
        ВЫЗЫВАЕТСЯ ОЧЕНЬ ЧАСТО. Возможно, еще и постоянно делает выборки из БД, но хз (инстансы приходят всякие разные)
        Вызов запросов к БД здесь категорически запрещен.
        В kwargs вроде ничего не приходит
        """
        yield f'user_id__{instance.id}'

    @user_change.serializer
    def user_change(self, instance: User, *_, **__):
        """
        Формирование сериализованных данных. Происходит один раз для всех ивентов подписки.
        Вызывается, даже если ни одна подписка на отслеживание не существует.
        В args приходит action, в kwargs вроде ничего не приходит
        """
        return UserSerializer(instance).data
