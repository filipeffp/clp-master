from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.models.usuario import Usuario
from api.serializers.usuario import UsuarioSerializer


@api_view(['GET'])
def usuario_get(request):
    items = Usuario.objects.all()
    serializer = UsuarioSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def usuario_post(request):
    serializer = UsuarioSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def usuario_get_id(request, pk):
    try:
        item = Usuario.objects.get(pk=pk)
    except Usuario.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = UsuarioSerializer(item)
    return Response(serializer.data)


@api_view(['PUT'])
def usuario_put(request, pk):
    try:
        item = Usuario.objects.get(pk=pk)
    except Usuario.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = UsuarioSerializer(item, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def usuario_delete(request, pk):
    try:
        item = Usuario.objects.get(pk=pk)
    except Usuario.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
