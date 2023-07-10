from django.contrib import admin
from . import models

admin.site.register(models.GamePlayer)
admin.site.register(models.GameChipModel)


@admin.register(models.Game)
class GameAdmin(admin.ModelAdmin):
    class PlayerInline(admin.TabularInline):
        model = models.GamePlayer
        extra = 0
        can_delete = True
        show_change_link = True

    inlines = [PlayerInline]
    list_display = ["id", "status", "current_player_id", "room_name", "created_time"]
