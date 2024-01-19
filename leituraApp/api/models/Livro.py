from django.db import models


class Livro(models.Model):
    livro_id        = models.BigAutoField(primary_key=True)
    titulo          = models.CharField(max_length=200)
    autor           = models.CharField(max_length=200)
    ano_publicacao  = models.IntegerField()

    def __str__(self):
        return self.titulo

    def informacaoLivro(self):
        return self.livro_id, self.titulo, self.autor, self.ano_publicacao