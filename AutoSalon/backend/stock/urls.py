from django.urls import path, include
from rest_framework.routers import DefaultRouter 

from .views import StockViewSet, ArrivalTypesViewSet

app_name = 'stock_api'

router = DefaultRouter()
router.register(r'stock', StockViewSet, basename='stock')
router.register(r'arrival-types', ArrivalTypesViewSet, basename='arrival-types')

urlpatterns = [
    path('', include(router.urls))
]