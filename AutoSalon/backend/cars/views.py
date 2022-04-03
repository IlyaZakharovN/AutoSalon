from django_filters import rest_framework as django_filters
from rest_framework import filters
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
    filter_backends = (filters.SearchFilter, django_filters.DjangoFilterBackend,)
    search_fields = [
        'model_id_id__brand', 
        'model_id_id__model',
        'model_id_id__package_name'
    ]
    filterset_fields = (
        'purpose',
        'status',
        'model_id_id__transmission_type',
        'model_id_id__drive_unit',
        'model_id_id__fuel_type', 
        'model_id_id__body'
    )

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