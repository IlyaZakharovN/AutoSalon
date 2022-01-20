from django.shortcuts import render
from rest_framework.permissions import BasePermission
from rest_framework.viewsets import ModelViewSet

from .models import Sale
from .serializers import PurchaseTypeSerializer, SaleSerializer

# Create your views here.

class CustomPermission(BasePermission):
    def has_obj_permission(self, request, view):
        if request.user:
            if (request.user.is_superuser or 
                request.user.is_sales_director or 
                request.user.is_sales_manager):
                return True
            else: 
                return False

class IsAuthenticatedPermission(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        else: 
            return True

class SaleViewSet(ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

    def get_permissions(self):
        self.permission_classes = [CustomPermission, IsAuthenticatedPermission]
        return super(self.__class__, self).get_permissions()