import os

import django
import uvicorn

from config.settings import ENV, BASE_DIR

if __name__ == "__main__":
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    django.setup()

    config = uvicorn.Config(
        app="config.asgi:application",
        host="0.0.0.0",
        port=ENV.int("DJANGO_PORT"),
        log_level="info",
        reload=True,
        reload_includes=BASE_DIR.as_posix(),
    )
    server = uvicorn.Server(config)
    server.run()
