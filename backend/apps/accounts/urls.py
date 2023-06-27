from dj_rest_auth.jwt_auth import get_refresh_view
from django.urls import path, include

urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('register/', include('dj_rest_auth.registration.urls')),
    path('refresh/', get_refresh_view().as_view(), name='token_refresh'),
]
