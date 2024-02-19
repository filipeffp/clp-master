from django.urls import path
from rest_framework.routers import SimpleRouter

from api.controllers.usuario_controller import UsuarioController
from api.controllers.livro_controller import LivroController
from api.controllers.historico_controller import HistoricoController
from api.controllers.colecao_controller import ColecaoController

# from api.controllers.livro_controller import livro_get
# from api.controllers.livro_controller import livro_get_id
# from api.controllers.livro_controller import livro_post
# from api.controllers.livro_controller import livro_put
# from api.controllers.livro_controller import livro_delete
#
# from api.controllers.usuario_controller import usuario_get
# from api.controllers.usuario_controller import usuario_get_id
# from api.controllers.usuario_controller import usuario_post
# from api.controllers.usuario_controller import usuario_put
# from api.controllers.usuario_controller import usuario_delete
#
# from api.controllers.colecao_controller import colecao_get
# from api.controllers.colecao_controller import colecao_get_id
# from api.controllers.colecao_controller import colecao_post
# from api.controllers.colecao_controller import colecao_put
# from api.controllers.colecao_controller import colecao_delete
#
# from api.controllers.historico_controller import historico_get
# from api.controllers.historico_controller import historico_get_id
# from api.controllers.historico_controller import historico_post
# from api.controllers.historico_controller import historico_put
# from api.controllers.historico_controller import historico_delete


# router = SimpleRouter()
# router.register(r'users', UsuarioController, basename='usuario')
# urlpatterns = router.urls
# specify URL Path for rest_framework
urlpatterns = [
    #path('usuario', UsuarioController.as_view({'get': 'list', 'post': 'create'}), name='mymodel-list')
    path('usuarios/buscar', UsuarioController.as_view({'get': 'listar_usuarios'}), name='usuario'),
    path('usuarios/buscar_id', UsuarioController.as_view({'get': 'listar_usuarios_id'}), name='usuario'),
    path('usuarios/criar', UsuarioController.as_view({'post': 'salvar_usuarios'}), name='usuario'),
    path('usuarios/atualizar', UsuarioController.as_view({'put': 'atualizar_usuarios'}), name='usuario'),
    path('usuarios/deletar', UsuarioController.as_view({'delete': 'deletar_usuarios'}), name='usuario'),

    path('livros/buscar', LivroController.as_view({'get': 'listar_livros'}), name='livro'),
    path('livros/buscar_id', LivroController.as_view({'get': 'listar_livros_id'}), name='livro'),
    path('livros/buscar_titulo', LivroController.as_view({'get': 'listar_livros_titulo'}), name='livro'),
    path('livros/criar', LivroController.as_view({'post': 'salvar_livros'}), name='livro'),
    path('livros/atualizar', LivroController.as_view({'put': 'atualizar_livros'}), name='livro'),
    path('livros/deletar', LivroController.as_view({'delete': 'deletar_livros'}), name='livro'),

    path('historicos/buscar', HistoricoController.as_view({'get': 'listar_historicos'}), name='historico'),
    path('historicos/buscar_id', HistoricoController.as_view({'get': 'listar_historicos_id'}), name='historico'),
    path('historicos/criar', HistoricoController.as_view({'post': 'salvar_historicos'}), name='historico'),
    path('historicos/atualizar', HistoricoController.as_view({'put': 'atualizar_historicos'}), name='historico'),
    path('historicos/deletar', HistoricoController.as_view({'delete': 'deletar_historicos'}), name='historico'),

    path('historicos/atualizar_meta', HistoricoController.as_view({'put': 'atualizar_meta_historicos'}), name='historico'),
    path('historicos/atualizar_leitura', HistoricoController.as_view({'put': 'atualizar_leiura_historicos'}), name='historico'),

    path('colecoes/buscar', ColecaoController.as_view({'get': 'listar_colecoes'}), name='colecao'),
    path('colecoes/buscar_id', ColecaoController.as_view({'get': 'listar_colecoes_id'}), name='colecao'),
    path('colecoes/criar', ColecaoController.as_view({'post': 'salvar_colecoes'}), name='colecao'),
    path('colecoes/atualizar', ColecaoController.as_view({'put': 'atualizar_colecoes'}), name='colecao'),
    path('colecoes/deletar', ColecaoController.as_view({'delete': 'deletar_colecoes'}), name='colecao'),

    path('colecoes/atualizar_livro', ColecaoController.as_view({'put': 'salvar_item_colecoes'}), name='colecao'),
    path('colecoes/deletar_livro', ColecaoController.as_view({'put': 'deletar_item_colecoes'}), name='colecao'),

    path('notificacoes/enviar', LivroController.as_view({'post': 'enviar_notificacao'}), name='livro'),
]
