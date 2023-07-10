from rest_framework import serializers
from . import models


class GameInListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Game
        fields = ['id', 'created_time', 'status', 'room_name']


# ----- GAME DETAIL ----- #
class GameChipSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.GamePlayer
        fields = "__all__"


class GamePlayerSerializer(serializers.ModelSerializer):
    own_chips = GameChipSerializer(many=True)
    keep_chips = GameChipSerializer(many=True)

    class Meta:
        model = models.GamePlayer
        fields = ["id", "game_place", "is_connected", "user_id", "own_chips", "keep_chips"]


class GameDetailSerializer(GameInListSerializer):
    players = GamePlayerSerializer(many=True)

    class Meta(GameInListSerializer.Meta):
        fields = ['id', 'created_time', 'status', 'room_name', 'current_player_id', 'current_move_dt_start', 'players']
