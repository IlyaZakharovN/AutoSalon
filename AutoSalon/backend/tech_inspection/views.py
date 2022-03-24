from django.shortcuts import render
from rest_framework.permissions import BasePermission
from rest_framework.viewsets import ModelViewSet

from .models import TechInspection, TechInspectionRequest
from .serializers import TechInspectionSerializer, TechInspectionRequestSerializer

# Create your views here.

class TechInspectionPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return (
                request.user.is_authenticated and (
                    request.user.is_superuser or 
                    request.user.is_sales_director or 
                    request.user.is_puchase_manager or
                    request.user.is_sales_manager or
                    request.user.is_tech_inspector
                )
            )
        elif view.action in ['create', 'update', 'partial_update', 'destroy']:
            return (
                request.user.is_authenticated and (
                    request.user.is_superuser or 
                    request.user.is_sales_director or
                    request.user.is_tech_inspector
                )
            )

class TechInspectionRequestPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action in [
            'list', 'retrieve', 'create', 
            'update', 'partial_update', 'destroy'
        ]:
            return (
                request.user.is_authenticated and (
                    request.user.is_superuser or 
                    request.user.is_sales_director or 
                    request.user.is_puchase_manager or
                    request.user.is_sales_manager or
                    request.user.is_tech_inspector
                )
            )

class TechInspectionViewSet(ModelViewSet):
    queryset = TechInspection.objects.all()
    serializer_class = TechInspectionSerializer
    permission_classes = (TechInspectionPermission,)

class TechInspectionRequesViewSet(ModelViewSet):
    queryset = TechInspectionRequest.objects.all()
    serializer_class = TechInspectionRequestSerializer
    permission_classes = (TechInspectionRequestPermission,)