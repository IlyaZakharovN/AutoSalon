from rest_framework.permissions import BasePermission, AllowAny, DjangoModelPermissionsOrAnonReadOnly, SAFE_METHODS
from rest_framework.viewsets import ModelViewSet
from rest_framework import filters

from .models import CarModel, CarModelPhoto
from .serializers import CarModelSerializer, CarModelPhotoSerializer

# Create your views here.

# class ReadOnly(BasePermission):
#     def has_permission(self, request, view):
#         return request.method in SAFE_METHODS

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
    filter_backends = (filters.SearchFilter,)
    search_fields = [
        'brand', 
        'model',
        'package_name'
    ]

class CarModelPhotoViewSet(ModelViewSet):
    queryset = CarModelPhoto.objects.all()
    serializer_class = CarModelPhotoSerializer
    permission_classes = (CustomPermission,)

    # def get_permissions(self):
    #     if self.action in ['list', 'retrieve']:
    #         self.permission_classes = [AllowAny]

    #     if self.action in ['create', 'update', 'partial_update', 'destroy']:
    #         self.permission_classes = [IsAuthenticatedPermission, CustomPermission]
            
    #     return super(self.__class__, self).get_permissions()