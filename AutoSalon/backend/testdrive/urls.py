from django.urls import path, include
from rest_framework.routers import DefaultRouter 

from .views import TestDriveViewSet

app_name = 'testdrive_api'

router = DefaultRouter()
router.register(r'', TestDriveViewSet, basename='testdrive')

urlpatterns = [
    path('', include(router.urls))
]