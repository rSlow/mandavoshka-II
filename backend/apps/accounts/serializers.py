from django.contrib.auth import get_user_model
from rest_framework import serializers

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['id', 'last_login', "username", "first_name", "last_name", "email", "is_active"]
        ref_name = "RestUser"


class JWTSerializer(serializers.Serializer):
    access = serializers.CharField()
