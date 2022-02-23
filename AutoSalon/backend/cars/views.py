from django.shortcuts import render
from rest_framework.permissions import BasePermission
from rest_framework.viewsets import ModelViewSet

from .models import Car, Purpose
from .serializers import CarSerializer, PurposeSerializer

# Create your views here.

class CustomPermission(BasePermission):
    def has_permission(self, request, view):
        # if view.action in ['create', 'update', 'partial_update', 'destroy']:
        #     return (request.user.is_authenticated and 
        #         (request.user.is_superuser or 
        #         request.user.is_sales_director or 
        #         request.user.is_puchase_manager))
        if view.action in ['list', 'retrieve']:
            return request.user
        elif view.action in ['create', 'update', 'partial_update', 'destroy']:
            return (request.user.is_authenticated and 
                (request.user.is_superuser or 
                request.user.is_sales_director or 
                request.user.is_puchase_manager))

class CustomPuposePermission(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list']:
            return request.user
        elif view.action in ['retrieve']:
            return request.user.is_authenticated
        elif view.action in ['create', 'update', 'partial_update', 'destroy']:
            return (request.user.is_authenticated and 
                (request.user.is_superuser or 
                request.user.is_sales_director))

class CarsViewSet(ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = (CustomPermission,)

class PurposeViewSet(ModelViewSet):
    queryset = Purpose.objects.all()
    serializer_class = PurposeSerializer
    permission_classes = (CustomPuposePermission,)