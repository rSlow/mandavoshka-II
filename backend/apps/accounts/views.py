from dj_rest_auth.jwt_auth import CookieTokenRefreshSerializer, set_jwt_access_cookie, set_jwt_refresh_cookie
from rest_framework.generics import ListAPIView, GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework import status

from .serializers import UserSerializer


class UsersAPIView(ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.serializer_class.Meta.model.objects.all()


class RefreshViewWithCookieSupport(TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        if response.status_code == status.HTTP_200_OK and 'access' in response.data:
            set_jwt_access_cookie(response, response.data['access'])
        if response.status_code == status.HTTP_200_OK and 'refresh' in response.data:
            set_jwt_refresh_cookie(response, response.data['refresh'])
            del response.data['refresh']
        return super().finalize_response(request, response, *args, **kwargs)


class NoAPIView(GenericAPIView):
    pass
