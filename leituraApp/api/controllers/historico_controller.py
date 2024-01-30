from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.models.historico import Historico
from api.serializers.historico import HistoricoSerializer


@api_view(['GET'])
def historico_get(request):
    items = Historico.objects.all()
    serializer = HistoricoSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def historico_post(request):
    serializer = HistoricoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def historico_get_id(request, pk):
    try:
        item = Historico.objects.get(pk=pk)
    except Historico.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = HistoricoSerializer(item)
    return Response(serializer.data)


@api_view(['PUT'])
def historico_put(request, pk):
    try:
        item = Historico.objects.get(pk=pk)
    except Historico.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = HistoricoSerializer(item, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def historico_delete(request, pk):
    try:
        item = Historico.objects.get(pk=pk)
    except Historico.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
