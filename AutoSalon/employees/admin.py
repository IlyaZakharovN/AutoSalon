from django.contrib import admin
from django.contrib.auth import get_user_model
User = get_user_model()
from django.db import models

# Register your models here.

# Configuring users from django admin panel:
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email',)
    list_display_links = ('id', 'name', 'email',)
    serch_fields = ('name', 'email')
    
    def save_model(self, request, obj, form, change):
        obj.save(using=self.using)

    def delete_model(self, request, obj):
        email = obj.email
        obj.delete(using=self.using)

    def get_queryset(self, request):
        return super().get_queryset(request) #.using(self.using)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        return super().formfield_for_foreignkey(db_field, request, using=self.using, **kwargs)

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        return super().formfield_for_manytomany(db_field, request, **kwargs) # removed using=self.using,

admin.site.register(User, UserAdmin)