# import serializer from rest_framework
from rest_framework import serializers

# import model from models.py
from api.models.colecao import ColecaoPessoal, ColecaoNovoPessoal


class ColecaoNovoSerializer(serializers.ModelSerializer):
    # specify model and fields
    class Meta:
        model = ColecaoNovoPessoal
        fields = '__all__'
        #fields = ('title', 'description')

# Create a model serializer
class ColecaoSerializer(serializers.ModelSerializer):
    # specify model and fields
    class Meta:
        model = ColecaoPessoal
        fields = '__all__'
        #fields = ('title', 'description')