from django.urls import path, include
from rest_framework.routers import DefaultRouter 

from .views import CarsViewSet, PurposeViewSet, StatusViewSet, CarModelPhotoViewSet

app_name = 'car_api'

router = DefaultRouter()
router.register(r'cars', CarsViewSet, basename='cars')
router.register(r'purposes', PurposeViewSet, basename='purpose')
router.register(r'statuses', StatusViewSet, basename='status')
router.register(r'photos', CarModelPhotoViewSet, basename='photo')

urlpatterns = [
    path('', include(router.urls))
]
