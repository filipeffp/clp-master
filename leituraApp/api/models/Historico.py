from django.db import models


class Historico(models.Model):
    historico_id    = models.BigAutoField(primary_key=True)
    usuario_id      = models.IntegerField()
    livro_id        = models.IntegerField()
    data_leitura    = models.DateTimeField()
    pagina_atual    = models.IntegerField()          
    data_meta       = models.DateTimeField()

    def __str__(self):
        return self.historico_id

    def metaTerminoDeLeitura(self, nova_data):
        self.data_meta = nova_data
        self.save
        return f"Data de meta para fim da leitura atualizada com sucesso. Nova data é: {self.data_meta}"
    
        