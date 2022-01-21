from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib import admin
from django.contrib.auth import get_user_model
User = get_user_model()
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError

from django.db import models

from .models import UserAccount

# Register your models here.

class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput())
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput())

    class Meta:
        model = UserAccount
        fields = ('email', 'name', 'password')
        # widgets = {
        #     'password': forms.PasswordInput(),
        # }

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user

class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = UserAccount
        fields = ('email', 'name', 'password', 'is_active', 'is_staff', 'is_sales_director', 'is_sales_manager', 'is_puchase_manager', 'is_tech_inspector')

# Configuring users from django admin panel:
class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ('id', 'name', 'email',)
    list_display_links = ('id', 'name', 'email',)
    serch_fields = ('name', 'email')
    list_filter = ('is_staff', 'is_sales_director', 'is_sales_manager', 'is_puchase_manager', 'is_tech_inspector')

    fieldsets = (
        (None, {'fields': ('email', 'name', 'password', )}),
        ('Permissions', {'fields': ('is_superuser', 'is_active', 'is_staff', 'is_sales_director', 'is_sales_manager', 'is_puchase_manager', 'is_tech_inspector')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2'),
        }),
        ('Permissions', {
            'fields': ('is_superuser', 'is_active', 'is_staff', 'is_sales_director', 'is_sales_manager', 'is_puchase_manager', 'is_tech_inspector')
        })
    )

    ordering = ('email',)

    filter_horizontal = ()
    
    # def save_model(self, request, obj, form, change):
    #     obj.save(using=self.using)

    # def delete_model(self, request, obj):
    #     email = obj.email
    #     obj.delete(using=self.using)

    # def get_queryset(self, request):
    #     return super().get_queryset(request) #.using(self.using)

    # def formfield_for_foreignkey(self, db_field, request, **kwargs):
    #     return super().formfield_for_foreignkey(db_field, request, using=self.using, **kwargs)

    # def formfield_for_manytomany(self, db_field, request, **kwargs):
    #     return super().formfield_for_manytomany(db_field, request, **kwargs) # removed using=self.using,

admin.site.register(UserAccount, UserAdmin)