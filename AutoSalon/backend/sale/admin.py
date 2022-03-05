from typing import Type
from django.contrib import admin

from .models import PurchaseType, Sale, SaleType, SaleStatus

# Register your models here.

admin.site.register(PurchaseType)
admin.site.register(Sale)
admin.site.register(SaleType)
admin.site.register(SaleStatus)
