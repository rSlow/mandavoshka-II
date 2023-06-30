from django.contrib.auth import get_user_model
from djangochannelsrestframework import mixins
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
from djangochannelsrestframework.permissions import IsAuthenticated

from .serializers import UserSerializer

User = get_user_model()


class UserConsumer(mixins.ListModelMixin,
                   GenericAsyncAPIConsumer):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
