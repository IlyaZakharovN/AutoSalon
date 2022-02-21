from django.urls import path, include
from rest_framework.routers import DefaultRouter 

from .views import CarsViewSet, PurposeViewSet

app_name = 'car_api'

router = DefaultRouter()
router.register(r'cars', CarsViewSet, basename='cars')
router.register(r'purpose', PurposeViewSet, basename='purpose')

urlpatterns = [
    path('', include(router.urls))
]
