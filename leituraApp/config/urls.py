"""
URL configuration for leituraApp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from django.contrib import admin
from django.template.defaulttags import url
from django.urls import path, include

from django.urls import path, re_path
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

import api.rotas.urls

# schema_view = get_schema_view(
#    openapi.Info(
#       title="Minha API",
#       default_version='v1',
#       description="Descrição da API",
#    ),
#    public=True,
#    permission_classes=(permissions.AllowAny,),
# )
#
# urlpatterns = [
#     path('', include("api.rotas.urls")),
#     re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
#     path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
#     path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
# ]




from rest_framework.routers import DefaultRouter

from api.controllers.usuario_controller import UsuarioController

router = DefaultRouter()
#router.register(r'tasks', UsuarioController)
router.register(r'usuario/', UsuarioController, basename='Usuario')



schema_view = get_schema_view(
    openapi.Info(
        title="CPL Leitura",
        default_version='v1',
        description="CPL Leitura",
        contact=openapi.Contact(email="cpl@myapp.com")
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    #path('admin/', admin.site.urls),
    #path('api/', include(router.urls)),
    #path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('api/', include(router.urls)),
    # Adicione as URLs do Swagger
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]








