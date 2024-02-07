from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, schema, action
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models.historico import Historico
from api.serializers.historico import HistoricoSerializer
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

    @swagger_auto_schema(
        request_body=None
    )
    @action(detail=True, methods=['patch'])
    def deletar_historicossss(self, request, pk=None):
        try:
            id = request.query_params.get('id')
            pk = int(id)
            item = Historico.objects.get(pk=pk)
        except Historico.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        item.delete()
        return Response(status=status.HTTP_200_OK)


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
