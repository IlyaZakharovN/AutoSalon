from django.contrib import admin

from .models import ArrivalType, Stock

# Register your models here.

admin.site.register(ArrivalType)
admin.site.register(Stock)