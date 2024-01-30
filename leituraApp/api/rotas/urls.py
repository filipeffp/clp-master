from django.urls import path

from api.controllers.livro_controller import livro_get
from api.controllers.livro_controller import livro_get_id
from api.controllers.livro_controller import livro_post
from api.controllers.livro_controller import livro_put
from api.controllers.livro_controller import livro_delete

from api.controllers.usuario_controller import usuario_get
from api.controllers.usuario_controller import usuario_get_id
from api.controllers.usuario_controller import usuario_post
from api.controllers.usuario_controller import usuario_put
from api.controllers.usuario_controller import usuario_delete

from api.controllers.colecao_controller import colecao_get
from api.controllers.colecao_controller import colecao_get_id
from api.controllers.colecao_controller import colecao_post
from api.controllers.colecao_controller import colecao_put
from api.controllers.colecao_controller import colecao_delete

from api.controllers.historico_controller import historico_get
from api.controllers.historico_controller import historico_get_id
from api.controllers.historico_controller import historico_post
from api.controllers.historico_controller import historico_put
from api.controllers.historico_controller import historico_delete


# specify URL Path for rest_framework
urlpatterns = [
    #path('', include(router.urls)),
    #path('api/', include('rest_framework.urls'))

     path('livro/', livro_get),
     path('livro/', livro_post),
     path('livro/<int:pk>/', livro_get_id),
     path('livro/<int:pk>/update/', livro_put),
     path('livro/<int:pk>/delete/', livro_delete),

    path('usuario/', usuario_get),
    path('usuario/', usuario_post),
    path('usuario/<int:pk>/', usuario_get_id),
    path('usuario/<int:pk>/update/', usuario_put),
    path('usuario/<int:pk>/delete/', usuario_delete),

    path('colecao/', colecao_get),
    path('colecao/', colecao_post),
    path('colecao/<int:pk>/', colecao_get_id),
    path('colecao/<int:pk>/update/', colecao_put),
    path('colecao/<int:pk>/delete/', colecao_delete),

    path('historico/', historico_get),
    path('historico/', historico_post),
    path('historico/<int:pk>/', historico_get_id),
    path('historico/<int:pk>/update/', historico_put),
    path('historico/<int:pk>/delete/', historico_delete)
]
