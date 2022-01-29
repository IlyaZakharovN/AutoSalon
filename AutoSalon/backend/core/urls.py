"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # simple jwt
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('admin/', admin.site.urls),

    # path('auth/user/', include('employees.urls')), # user
    path('me/', include('employees.urls', namespace='user_api')), # user
    path('carmodels/', include('carmodels.urls', namespace='carmodel_api')),
    path('cars/', include('cars.urls', namespace='car_api')),
    path('stock/', include('stock.urls', namespace='stock_api')),
    path('testdrives/', include('testdrive.urls', namespace='testdrive_api')),
    path('addoptions/', include('add_option.urls', namespace='addoption_api')),
    path('sales/', include('sale.urls', namespace='sale_api')),
    path('techinspections/', include('tech_inspection.urls', namespace='tech_inspection_api')),

    path('api-auth/', include('rest_framework.urls')) # django-rest-framework, not used because of simplejwt
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 
