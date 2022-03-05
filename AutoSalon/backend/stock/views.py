from rest_framework.permissions import BasePermission, AllowAny
from rest_framework.viewsets import ModelViewSet

from .models import ArrivalType, Stock
from .serializers import ArrivalTypeSerializer, StockSerializer

# Create your views here.

class StockPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.is_authenticated
        elif view.action in ['create', 'update', 'partial_update']:
            return (request.user.is_authenticated and 
                (request.user.is_superuser or 
                request.user.is_sales_manager or
                request.user.is_sales_director or 
                request.user.is_puchase_manager or 
                request.user.is_tech_inspector))
        elif view.action in ['destroy']:
            return (request.user.is_authenticated and 
                (request.user.is_superuser or 
                request.user.is_sales_director))

class ArrivalPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action in ['list', 'retrieve']:
            return request.user.is_authenticated
        elif view.action in ['create', 'update', 'partial_update', 'destroy']:
            return (request.user.is_authenticated and 
                (request.user.is_superuser or 
                request.user.is_sales_director or 
                request.user.is_puchase_manager))

class ArrivalTypesViewSet(ModelViewSet):
    queryset = ArrivalType.objects.all()
    serializer_class = ArrivalTypeSerializer
    permission_classes = (ArrivalPermission,)

class StockViewSet(ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    permission_classes = (StockPermission,)