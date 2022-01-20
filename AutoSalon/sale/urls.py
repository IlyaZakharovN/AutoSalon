from django.template import base
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import SaleViewSet

app_name = 'sale_api'

router = DefaultRouter()
router.register('', SaleViewSet, basename='sale')

urlpatterns = [
    path('', include(router.urls))
]