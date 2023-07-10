from channels.routing import URLRouter
from django.urls import path, include
from apps.accounts import routing as accounts_routing
from apps.games import routing as games_routing

websocket_urlpatterns = [
    path("users/", URLRouter(accounts_routing.websocket_urlpatterns)),
    path("games/", URLRouter(games_routing.websocket_urlpatterns)),
]
