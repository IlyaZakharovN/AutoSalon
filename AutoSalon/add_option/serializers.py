from rest_framework import serializers

from .models import AddOption

class AddOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddOption
        fields = '__all__'