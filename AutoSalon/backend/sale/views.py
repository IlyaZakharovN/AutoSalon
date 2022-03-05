from django.shortcuts import render
from rest_framework.permissions import BasePermission
from rest_framework.viewsets import ModelViewSet

from .models import Sale, PurchaseType, SaleType, SaleStatus
from .serializers import PurchaseTypeSerializer, SaleSerializer, SaleTypeSerializer, SaleStatusSerializer

# Create your views here.

class SalePermission(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.is_authenticated
        elif view.action in ['create',]:
            return (request.user.is_authenticated and 
                (request.user.is_superuser or 
                request.user.is_sales_director or 
                request.user.is_sales_manager))
        elif view.action in ['update', 'partial_update',]:
            return (request.user.is_authenticated and 
                (request.user.is_superuser or 
                request.user.is_sales_director or 
                request.user.is_sales_manager or
                request.user.is_purchase_manager))
        elif view.action in ['destroy',]:
            return (request.user.is_authenticated and 
                (request.user.is_superuser or 
                request.user.is_sales_director))

class CustomPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.is_authenticated
        elif view.action in ['create', 'update', 'partial_update', 'destroy']:
            return (request.user.is_authenticated and 
                (request.user.is_superuser or 
                request.user.is_sales_director))

class SaleViewSet(ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    permission_classes = (SalePermission,)

class PurchaseTypeViewSet(ModelViewSet):
    queryset = PurchaseType.objects.all()
    serializer_class = PurchaseTypeSerializer
    permission_classes = (CustomPermission,)

class SaleTypeViewSet(ModelViewSet):
    queryset = SaleType.objects.all()
    serializer_class = SaleStatusSerializer
    permission_classes = (CustomPermission,)

class SaleStatusViewSet(ModelViewSet):
    queryset = SaleStatus.objects.all()
    serializer_class = SaleStatusSerializer
    permission_classes = (CustomPermission,)