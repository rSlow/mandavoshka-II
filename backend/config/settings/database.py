from ._base import ENV

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": ENV.str("POSTGRES_DB"),
        "USER": ENV.str("POSTGRES_USER"),
        "PASSWORD": ENV.str("POSTGRES_PASSWORD"),
        "HOST": ENV.str("POSTGRES_HOST"),
        "PORT": ENV.int("POSTGRES_PORT"),
    }
}
