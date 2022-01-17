from django.urls import path

from .views import RetrieveUserView

urlpatterns = [
    path('me', RetrieveUserView.as_view())
]