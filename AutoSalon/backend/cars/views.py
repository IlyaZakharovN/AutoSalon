from django.shortcuts import render
from rest_framework.permissions import BasePermission
from rest_framework.viewsets import ModelViewSet

from .models import Car, Purpose, Status, CarPhoto
from .serializers import CarSerializer, PurposeSerializer, StatusSerializer, CarPhotoSerializer

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
        elif view.action in ['create', 'update',]:
            return (request.user.is_authenticated and 
                (request.user.is_superuser or 
                request.user.is_sales_director or 
                request.user.is_puchase_manager or 
                request.user.is_sales_manager))
        elif view.action in ['partial_update',]:
            return (request.user.is_authenticated)
        elif view.action in ['destroy',]:
            return (request.user.is_authenticated and 
                (request.user.is_superuser or 
                request.user.is_sales_director))

class ListOnlyPermission(BasePermission):
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
    permission_classes = (ListOnlyPermission,)

class StatusViewSet(ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
    permission_classes = (ListOnlyPermission,)

class CarModelPhotoViewSet(ModelViewSet):
    queryset = CarPhoto.objects.all()
    serializer_class = CarPhotoSerializer
    permission_classes = (CustomPermission,)