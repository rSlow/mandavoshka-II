from ._base import BASE_DIR, ENV

STATIC_ROOT = BASE_DIR / ENV.str("DJANGO_STATIC_PATH")
STATIC_URL = ENV.str("DJANGO_STATIC_URL")

STATICFILES_DIRS = []
