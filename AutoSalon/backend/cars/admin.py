from django.contrib import admin

from .models import Car, Purpose, Status, CarPhoto

# Register your models here.

admin.site.register(Car)
admin.site.register(Purpose)
admin.site.register(Status)
admin.site.register(CarPhoto)