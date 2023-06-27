from ._base import ENV

if ENV.bool("SMTP_DEBUG", default=False):
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
else:
    EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

EMAIL_HOST = ENV.str("EMAIL_HOST")
EMAIL_PORT = ENV.int("EMAIL_PORT")

EMAIL_HOST_USER = ENV.str("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = ENV.str("EMAIL_HOST_PASSWORD")
EMAIL_USE_TLS = ENV.bool("EMAIL_USE_TLS")
EMAIL_USE_SSL = ENV.bool("EMAIL_USE_SSL")

DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
