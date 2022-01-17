from django.contrib import admin

from .models import CarModel

# Register your models here.

class CarModelAdmin(admin.ModelAdmin):
    list_filter = ('brand', 'year', 'body', 'fuel_type', 'transmission_type', 'drive_unit')
    list_per_page = 25
    # search_fields = 

admin.site.register(CarModel, CarModelAdmin)