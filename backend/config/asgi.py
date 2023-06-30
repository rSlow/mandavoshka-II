from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

from apps.accounts import routing
from apps.accounts.middleware import JwtAuthMiddlewareStack


application = ProtocolTypeRouter({
  "http": get_asgi_application(),
  "websocket": JwtAuthMiddlewareStack(
        URLRouter(
            routing.websocket_urlpatterns
        )
    ),
})