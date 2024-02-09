# import serializer from rest_framework
from rest_framework import serializers

# import model from models.py
from api.models.historico import Historico, HistoricoMeta


class HistoricoMetaSerializer(serializers.ModelSerializer):
    # specify model and fields
    class Meta:
        model = HistoricoMeta  # Substitua 'Historico' pelo nome do seu modelo
        fields = '__all__'

# Create a model serializer
class HistoricoSerializer(serializers.ModelSerializer):
    # specify model and fields
    class Meta:
        model = Historico  # Substitua 'Historico' pelo nome do seu modelo
        fields = '__all__'  # Ou especifique os campos que você deseja incluir/excluir
        swagger_schema_fields = {
            'exclude': True,
        }

        # model = Historico
        # fields = '__all__'
        # extra_kwargs = {
        #     'data_meta': {'allow_null': True}
        # }
