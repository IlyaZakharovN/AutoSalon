from rest_framework import serializers

from .models import TechInspection

class TechInspectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechInspection
        fields = '__all__'