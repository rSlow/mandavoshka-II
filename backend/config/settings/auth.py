from datetime import timedelta

SITE_ID = 1

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]

AUTH_USER_MODEL = "accounts.RestUser"

ACCOUNT_SIGNUP_PASSWORD_ENTER_TWICE = True
ACCOUNT_USERNAME_REQUIRED = True
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_EMAIL_VERIFICATION = False

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=15),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": True,
    "TOKEN_REFRESH_SERIALIZER": "dj_rest_auth.jwt_auth.CookieTokenRefreshSerializer"
}

REST_AUTH = {
    'JWT_SERIALIZER': 'accounts.serializers.JWTSerializer',
    "JWT_AUTH_REFRESH_COOKIE": "refresh_token",
    'SESSION_LOGIN': False,
    'USE_JWT': True,
    'JWT_AUTH_HTTPONLY': True,
    "USER_DETAILS_SERIALIZER": "accounts.serializers.UserSerializer",
}
