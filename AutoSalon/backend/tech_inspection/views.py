from django.shortcuts import render
from rest_framework.permissions import BasePermission
from rest_framework.viewsets import ModelViewSet

from .models import TechInspection
from .serializers import TechInspectionSerializer

# Create your views here.

class CustomPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.is_authenticated
        elif view.action in ['create', 'update', 'partial_update', 'destroy']:
            return (request.user.is_authenticated and
                (request.user.is_superuser or 
                request.user.is_sales_director or 
                request.user.is_tech_inspector))

# class IsAuthenticatedPermission(BasePermission):
#     def has_permission(self, request, view):
#         if not request.user.is_authenticated:
#             return False
#         else: 
#             return True

class TechInspectionViewSet(ModelViewSet):
    queryset = TechInspection.objects.all()
    serializer_class = TechInspectionSerializer
    permission_classes = (CustomPermission,)