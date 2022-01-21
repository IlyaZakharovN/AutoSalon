from rest_framework import serializers

from .models import TestDrive

class TestDriveSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestDrive
        fields = '__all__'