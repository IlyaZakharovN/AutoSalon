from rest_framework import fields, serializers

from .models import CarModel

class CarModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarModel
        fields = '__all__'