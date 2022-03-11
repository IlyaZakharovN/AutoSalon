from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import SaleViewSet, PurchaseTypeViewSet, SaleTypeViewSet, SaleStatusViewSet

app_name = 'sale_api'

router = DefaultRouter()
router.register(r'sales', SaleViewSet, basename='sale')
router.register(r'purchase-types', PurchaseTypeViewSet, basename='purchase-types')
router.register(r'sale-types', SaleTypeViewSet, basename='sale-types')
router.register(r'sale-statuses', SaleStatusViewSet, basename='status')

urlpatterns = [
    path('', include(router.urls))
]