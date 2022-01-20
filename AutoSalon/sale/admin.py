from django.contrib import admin

from .models import PurchaseType, Sale

# Register your models here.

admin.site.register(PurchaseType)
admin.site.register(Sale)