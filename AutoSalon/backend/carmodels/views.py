from django_filters import rest_framework as django_filters
from rest_framework import filters
from rest_framework.permissions import BasePermission
from rest_framework.viewsets import ModelViewSet

from .models import CarModel, CarModelPhoto
from .serializers import CarModelSerializer, CarModelPhotoSerializer

# Create your views here.

class CustomPermission(BasePermission):
    def has_obj_permission(self, request, view):
        if view.action in ['create', 'update', 'partial_update']:
            return (request.user.is_authenticated and 
                (request.user.is_superuser or 
                request.user.is_sales_director or 
                request.user.is_puchase_manager))
        elif view.action in ['destroy',]:
            return (request.user.is_authenticated and 
                (request.user.is_superuser or 
                request.user.is_sales_director))

class CarModelsViewSet(ModelViewSet):
    queryset = CarModel.objects.all()
    serializer_class = CarModelSerializer
    permission_classes = (CustomPermission,)
    filter_backends = (filters.SearchFilter, django_filters.DjangoFilterBackend,)
    search_fields = [
        'brand', 
        'model',
        'package_name',
        'year'
    ]
    filterset_fields = (
        'transmission_type',
        'drive_unit',
        'fuel_type', 
        'body'
    )

class CarModelPhotoViewSet(ModelViewSet):
    queryset = CarModelPhoto.objects.all()
    serializer_class = CarModelPhotoSerializer
    permission_classes = (CustomPermission,)