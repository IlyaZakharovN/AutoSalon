from django.shortcuts import render
from rest_framework.permissions import BasePermission, AllowAny
from rest_framework.viewsets import ModelViewSet

from .models import ArrivalType, Stock
from .serializers import ArrivalTypeSerializer, StockSerializer

# Create your views here.

class CustomPermission(BasePermission):
    def has_obj_permission(self, request, view):
        if request.user:
            if (request.user.is_superuser or 
                request.user.is_sales_director or 
                request.user.is_sales_manager or 
                request.user.is_puchase_manager or 
                request.user.is_tech_inspector):
                return True
            else: 
                return False

class IsAuthenticatedPermission(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        else: 
            return True

class ArrivalTypesViewSet(ModelViewSet):
    queryset = ArrivalType.objects.all()
    serializer_class = ArrivalTypeSerializer

class StockViewSet(ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer

    def get_permissions(self):
        self.permission_classes = [CustomPermission, IsAuthenticatedPermission]
            
        return super(self.__class__, self).get_permissions()