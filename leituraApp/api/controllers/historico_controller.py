from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, schema, action
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models.historico import Historico
from api.models.livro import Livro
from api.serializers.historico import HistoricoSerializer, HistoricoMetaSerializer, HistoricoLeituraSerializer
from api.serializers.livro import LivroSerializer
from config.schema import CustomSchema



class HistoricoController(viewsets.ModelViewSet):
    queryset = Historico.objects.all()
    serializer_class = HistoricoSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    @action(detail=True, methods=['GET'])
    def listar_historicos(self, request):
        items = Historico.objects.all()
        serializer = HistoricoSerializer(items, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(method='get', manual_parameters=[openapi.Parameter(name='id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER),])
    @action(detail=True, methods=['GET'])
    def listar_historicos_id(self, request):
        try:
            id = request.query_params.get('id')
            pk = int(id)
            item = Historico.objects.get(pk=pk)
        except Historico.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = HistoricoSerializer(item)
        return Response(serializer.data, status=status.HTTP_200_OK)


    #@api_view(['POST'])
    @swagger_auto_schema(request_body=HistoricoSerializer)
    @action(detail=True, methods=['POST'])
    def salvar_historicos(self, request):
        request.data['data_meta'] = None
        serializer = HistoricoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @swagger_auto_schema(method='put', manual_parameters=[openapi.Parameter(name='id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER),])
    @action(detail=True, methods=['PUT'])
    def atualizar_historicos(self, request):
        try:
            id = request.query_params.get('id')
            pk = int(id)
            item = Historico.objects.get(pk=pk)
        except Historico.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = HistoricoSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    # @swagger_auto_schema(method='put', manual_parameters=[
    #     openapi.Parameter(name='livro_id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER),
    # openapi.Parameter(name='usuario_id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER)], request_body=HistoricoMetaSerializer)
    # @action(detail=True, methods=['put'])
    # def atualizar_meta_historicos(self, request, pk=None):
    #     try:
    #         livro_id = int(request.query_params.get('livro_id'))
    #         usuario_id = int(request.query_params.get('usuario_id'))
    #         #titulo = request.query_params.get('titulo')
    #         item = Historico.objects.filter(livro_id=livro_id, usuario_id=usuario_id)
    #         item.data['data_meta'] = request.data['data_meta']
    #     except Historico.DoesNotExist:
    #         return Response(status=status.HTTP_404_NOT_FOUND)
    #
    #     serializer = HistoricoSerializer(data=item)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(method='put', manual_parameters=[
        openapi.Parameter(name='livro_id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER),
        openapi.Parameter(name='usuario_id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER)],
                         request_body=HistoricoMetaSerializer)
    @action(detail=True, methods=['put'])
    def atualizar_meta_historicos(self, request, pk=None):
        try:
            livro_id = request.query_params.get('livro_id')
            usuario_id = request.query_params.get('usuario_id')
            data_meta = request.data.get('data_meta')
            item = Historico.objects.get(livro_id=livro_id, usuario_id=usuario_id)

            # Criar um dicionário apenas com o campo data_meta
            data_atualizada = {'data_meta': data_meta}

            # Atualizar o objeto Historico com os novos dados mantendo os outros campos inalterados
            serializer = HistoricoSerializer(instance=item, data=data_atualizada, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Historico.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @swagger_auto_schema(method='put', manual_parameters=[
        openapi.Parameter(name='livro_id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER),
        openapi.Parameter(name='usuario_id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER)],
                         request_body=HistoricoLeituraSerializer)
    @action(detail=True, methods=['put'])
    def atualizar_leiura_historicos(self, request, pk=None):
        try:
            livro_id = request.query_params.get('livro_id')
            usuario_id = request.query_params.get('usuario_id')
            data_meta = request.data.get('data_meta')
            data_leitura = request.data.get('data_leitura')
            pagina_atual = request.data.get('pagina_atual')
            concluido = request.data.get('concluido')
            item = Historico.objects.get(livro_id=livro_id, usuario_id=usuario_id)
            item2 = Livro.objects.get(livro_id=livro_id)

            # Criar um dicionário apenas com o campo data_meta
            item_atualizado = {'data_meta': data_meta}
            item_atualizado['data_leitura'] = data_leitura
            item_atualizado['pagina_atual'] = pagina_atual

            item2_atualizado = {'pagina_atual': pagina_atual}
            item2_atualizado['concluido'] = concluido

            # Atualizar o objeto Historico com os novos dados mantendo os outros campos inalterados
            serializer = HistoricoSerializer(instance=item, data=item_atualizado, partial=True)
            serializer2 = LivroSerializer(instance=item2, data=item2_atualizado, partial=True)
            if serializer.is_valid() and serializer2.is_valid():
                serializer.save()
                serializer2.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Historico.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


    @swagger_auto_schema(method='delete', manual_parameters=[openapi.Parameter(name='id', in_=openapi.IN_QUERY, type=openapi.TYPE_INTEGER),])
    @action(detail=True, methods=['DELETE'])
    def deletar_historicos(self, request):
        try:
            id = request.query_params.get('id')
            pk = int(id)
            item = Historico.objects.get(pk=pk)
        except Historico.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        item.delete()
        return Response(status=status.HTTP_200_OK)
