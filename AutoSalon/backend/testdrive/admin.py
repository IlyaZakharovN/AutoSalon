from django.contrib import admin

from .models import TestDrive, TestDriveStatus

# Register your models here.

admin.site.register(TestDrive)
admin.site.register(TestDriveStatus)
