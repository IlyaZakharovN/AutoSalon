from django.contrib.auth import get_user_model
User = get_user_model()
from django.db.models.base import Model

from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'email', 'is_sales_director', 'is_sales_manager', 'is_puchase_manager', 'is_tech_inspector')