from django.contrib import admin

from .models import TechInspection, TechInspectionRequest

# Register your models here.

admin.site.register(TechInspection)
admin.site.register(TechInspectionRequest)