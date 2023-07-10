import sys
from pathlib import Path

from environs import Env

BASE_DIR = Path(__file__).resolve().parent.parent.parent

APPS_DIR = BASE_DIR / "apps"
sys.path.insert(0, str(APPS_DIR))

ENV_FILE = BASE_DIR.parent / "env.env"
ENV = Env()
ENV.read_env(ENV_FILE.as_posix())

SECRET_KEY = ENV.str("SECRET_KEY")
DEBUG = ENV.bool("DJANGO_DEBUG", default=False)

ALLOWED_HOSTS = ["localhost", "0.0.0.0", "127.0.0.1"]
ALLOWED_HOSTS.extend(ENV.list("ALLOWED_HOSTS", default=[]))

INSTALLED_APPS = [
    # --- django ---
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # --- 3-rd party ---
    # rest
    "rest_framework",
    "corsheaders",

    # docs
    "drf_yasg",

    # allauth (for jwt)
    "allauth",
    "allauth.account",
    "allauth.socialaccount",

    # dj-rest-jwt
    "dj_rest_auth",
    "dj_rest_auth.registration",
    "rest_framework.authtoken",

    # channels
    "channels",

    # --- local ---
    "apps.accounts.apps.AccountsConfig",
    "apps.games.apps.GamesConfig",
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # cors-headers
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'
ASGI_APPLICATION = 'config.asgi.application'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'ru-ru'
USE_I18N = True

TIME_ZONE = 'UTC'
USE_TZ = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

DOMAIN = ENV.str("DOMAIN")
TIME_FORMAT = "%d-%m-%Y %H:%M:%S"
