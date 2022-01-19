from rest_framework import serializers

from .models import ArrivalType, Stock

class ArrivalTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArrivalType
        fields = '__all__'

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'