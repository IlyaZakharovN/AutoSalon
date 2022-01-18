from django.urls import path, include
from rest_framework.routers import DefaultRouter 

from .views import CarsViewSet

app_name = 'car_api'

router = DefaultRouter()
router.register(r'', CarsViewSet, basename='car')

urlpatterns = [
    path('', include(router.urls))
]
