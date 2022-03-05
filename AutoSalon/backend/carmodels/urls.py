from django.urls import path, include
from rest_framework.routers import DefaultRouter 

from .views import CarModelsViewSet, CarModelPhotoViewSet

app_name = 'carmodel_api'

router = DefaultRouter()
router.register(r'models', CarModelsViewSet, basename='carmodel')
router.register(r'photos', CarModelPhotoViewSet, basename='photo')

urlpatterns = [
    path('', include(router.urls))
]


# http://127.0.0.1:8000/carmodels/ - list all Car Models
# http://127.0.0.1:8000/carmodels/id/ - exact Car Model