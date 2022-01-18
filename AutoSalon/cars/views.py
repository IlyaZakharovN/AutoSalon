from django.shortcuts import render
from rest_framework.permissions import BasePermission, AllowAny
from rest_framework.viewsets import ModelViewSet

from .models import Car
from .serializers import CarSerializer

# Create your views here.

class CustomPermission(BasePermission):
    def has_obj_permission(self, request, view):
        if request.user:
            if request.user.is_superuser or request.user.is_sales_director or request.user.is_puchase_manager:
                return True
            else: 
                return False

class IsAuthenticatedPermission(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        else: 
            return True

class CarsViewSet(ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

    def get_permissions(self):
        if self.action == 'list' or self.action == 'retrieve':
            self.permission_classes = [AllowAny,]

        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            self.permission_classes = [IsAuthenticatedPermission, CustomPermission]
            
        return super(self.__class__, self).get_permissions()