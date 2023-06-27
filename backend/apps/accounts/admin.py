from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from apps.accounts.models import RestUser


# Register your models here.

@admin.register(RestUser)
class RestUserAdmin(admin.ModelAdmin):
    list_display = ["email", "username", "first_name", "last_name", "is_staff", "is_active", "sex"]
    fieldsets = [
        (None, {"fields": ("username",)}),
        (_("Personal info"), {"fields": ("first_name", "last_name", "email", "sex")}),
        (_("Permissions"), {"fields": (
            "is_active",
            "is_staff",
            "is_superuser",
        )}),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    ]
