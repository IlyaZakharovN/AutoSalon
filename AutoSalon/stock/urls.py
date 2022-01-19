from django.urls import path, include
from rest_framework.routers import DefaultRouter 

from .views import StockViewSet

app_name = 'stock_api'

router = DefaultRouter()
router.register(r'', StockViewSet, basename='stock')

urlpatterns = [
    path('', include(router.urls))
]