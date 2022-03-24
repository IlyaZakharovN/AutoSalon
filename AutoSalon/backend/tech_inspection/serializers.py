from rest_framework import serializers

from .models import TechInspection, TechInspectionRequest

class TechInspectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechInspection
        fields = '__all__'

class TechInspectionRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechInspectionRequest
        fields = '__all__'