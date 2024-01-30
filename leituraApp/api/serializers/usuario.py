# import serializer from rest_framework
from rest_framework import serializers

# import model from models.py
from api.models.usuario import Usuario


# Create a model serializer
class UsuarioSerializer(serializers.ModelSerializer):
    # specify model and fields
    class Meta:
        model = Usuario
        #fields = ('title', 'description')