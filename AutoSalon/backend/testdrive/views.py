from django.shortcuts import render
from rest_framework.permissions import BasePermission
from rest_framework.viewsets import ModelViewSet

from .models import TestDrive, TestDriveStatus
from .serializers import TestDriveSerializer, TestDriveStatusSerializer

# Create your views here.

class CustomPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['create', 'list']:
            return request.user
        elif view.action in ['retrieve']:
            return request.user.is_authenticated
        elif view.action in ['update', 'partial_update', 'destroy']:
            return (request.user.is_authenticated and 
                (request.user.is_superuser or 
                request.user.is_sales_manager or
                request.user.is_sales_director))

class CustomStatusPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list']:
            return request.user
        elif view.action in ['retrieve']:
            return request.user.is_authenticated
        elif view.action in ['create', 'update', 'partial_update', 'destroy']:
            return (request.user.is_authenticated and 
                (request.user.is_superuser or 
                request.user.is_sales_director))

class IsAuthenticatedPermission(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        else: 
            return True

class TestDriveViewSet(ModelViewSet):
    queryset = TestDrive.objects.all()
    serializer_class = TestDriveSerializer
    permission_classes = (CustomPermission,)

class TestDriveStatusViewSet(ModelViewSet):
    queryset = TestDriveStatus.objects.all()
    serializer_class = TestDriveStatusSerializer
    permission_classes = (CustomStatusPermission,)
