from django.db import models

from api.models.livro import Livro
from api.models.usuario import Usuario


class Historico(models.Model):
    historico_id    = models.BigAutoField(primary_key=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    livro = models.ForeignKey(Livro, on_delete=models.CASCADE)
    #usuario_id      = models.IntegerField()
    #livro_id        = models.IntegerField()
    data_leitura    = models.DateTimeField()
    pagina_atual    = models.IntegerField()          
    data_meta       = models.DateTimeField()

    def __str__(self):
        return self.historico_id

    def metaTerminoDeLeitura(self, nova_data):
        self.data_meta = nova_data
        self.save
        return f"Data de meta para fim da leitura atualizada com sucesso. Nova data é: {self.data_meta}"
    
        