from django.shortcuts import render
from rest_framework.permissions import BasePermission
from rest_framework.viewsets import ModelViewSet

from .models import Sale, PurchaseType
from .serializers import PurchaseTypeSerializer, SaleSerializer

# Create your views here.

class CustomPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.is_authenticated
        elif view.action in ['create', 'update', 'partial_update', 'destroy']:
            return (request.user.is_authenticated and 
                (request.user.is_superuser or 
                request.user.is_sales_director or 
                request.user.is_sales_manager))

class SaleViewSet(ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    permission_classes = (CustomPermission,)

class PurchaseTypeViewSet(ModelViewSet):
    queryset = PurchaseType.objects.all()
    serializer_class = PurchaseTypeSerializer
    permission_classes = (CustomPermission,)