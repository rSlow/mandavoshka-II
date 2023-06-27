from django.urls import path, include

from .views import UsersAPIView, RefreshViewWithCookieSupport, NoAPIView

urlpatterns = [
    # replacement for incorrect url
    path('token/refresh/', RefreshViewWithCookieSupport.as_view(), name='token_refresh'),

    path('', include('dj_rest_auth.urls')),
    path('register/', include('dj_rest_auth.registration.urls')),
    path('users/', UsersAPIView.as_view(), name='users'),
]
