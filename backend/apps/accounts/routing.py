from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path("accounts/", consumers.UserConsumer.as_asgi()),
]
