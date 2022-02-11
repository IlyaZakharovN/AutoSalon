from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import SaleViewSet, PurchaseTypeViewSet

app_name = 'sale_api'

router = DefaultRouter()
router.register(r'sale', SaleViewSet, basename='sale')
router.register(r'purchase-types', PurchaseTypeViewSet, basename='purchase-types')

urlpatterns = [
    path('', include(router.urls))
]