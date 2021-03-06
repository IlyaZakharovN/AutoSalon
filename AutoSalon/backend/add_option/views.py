from django.shortcuts import render
from rest_framework.permissions import BasePermission, AllowAny
from rest_framework.viewsets import ModelViewSet

from .models import AddOption
from .serializers import AddOptionSerializer

# Create your views here.

class CustomPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user
        elif view.action in ['create', 'update', 'partial_update', 'destroy']:
            return (request.user.is_authenticated and 
                (request.user.is_superuser or 
                request.user.is_sales_director or 
                request.user.is_sales_manager))

    # def has_obj_permission(self, request, view):
    #     if request.user:
    #         if (request.user.is_superuser or 
    #             request.user.is_sales_director or 
    #             request.user.is_sales_manager):
    #             return True
    #         else: 
    #             return False

# class IsAuthenticatedPermission(BasePermission):
#     def has_permission(self, request, view):
#         if not request.user.is_authenticated:
#             return False
#         else: 
#             return True

class AddOptionViewSet(ModelViewSet):
    queryset = AddOption.objects.all()
    serializer_class = AddOptionSerializer
    permission_classes = (CustomPermission,)

    # def get_permissions(self):
    #     self.permission_classes = [CustomPermission, IsAuthenticatedPermission]
    #     return super(self.__class__, self).get_permissions()
