from django.urls import path, include

from .views import UsersAPIView, RefreshViewWithCookieSupport, TokenVerifyView

urlpatterns = [
    # replacement for incorrect refresh and verify token views
    path('token/refresh/', RefreshViewWithCookieSupport.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('', include('dj_rest_auth.urls')),
    path('register/', include('dj_rest_auth.registration.urls')),
    path('users/', UsersAPIView.as_view(), name='users'),
]
