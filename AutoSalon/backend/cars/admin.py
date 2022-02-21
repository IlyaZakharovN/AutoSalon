from django.contrib import admin

from .models import Car, Purpose

# Register your models here.

admin.site.register(Car)
admin.site.register(Purpose)