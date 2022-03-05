from rest_framework import serializers

from .models import CarModel, CarModelPhoto

class CarModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarModel
        fields = '__all__'

class CarModelPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarModelPhoto
        fields = '__all__'