from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path("", consumers.GamesListConsumer.as_asgi()),
    path("<int:id>/", consumers.GameDetailConsumer.as_asgi()),
]
