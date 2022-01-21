from django.urls import path, include
from rest_framework.routers import DefaultRouter 

from .views import CarModelsViewSet

app_name = 'carmodel_api'

router = DefaultRouter()
router.register(r'', CarModelsViewSet, basename='carmodel')
# urlpatterns = router.urls
urlpatterns = [
    path('', include(router.urls))
]


# http://127.0.0.1:8000/carmodels/ - list all Car Models
# http://127.0.0.1:8000/carmodels/id/ - exact Car Model