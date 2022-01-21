from django.db import router
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import TechInspectionViewSet

app_name = 'tech_inspection_api'

router = DefaultRouter()
router.register('', TechInspectionViewSet, basename='techinspection')

urlpatterns = [
    path('', include(router.urls))
]