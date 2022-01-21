from rest_framework import serializers

from .models import PurchaseType, Sale

class PurchaseTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseType
        fields = '__all__'

class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'