from django.urls import path, include
from rest_framework.routers import DefaultRouter 

from .views import AddOptionViewSet

app_name = 'addoption_api'

router = DefaultRouter()
router.register(r'', AddOptionViewSet, basename='addoption')

urlpatterns = [
    path('', include(router.urls))
]