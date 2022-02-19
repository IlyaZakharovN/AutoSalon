from rest_framework import serializers

from .models import TestDrive, TestDriveStatus

class TestDriveSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestDrive
        fields = '__all__'

class TestDriveStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestDriveStatus
        fields = '__all__'