from django.db import models


class Livro(models.Model):
    livro_id              = models.BigAutoField(primary_key=True)
    titulo                = models.CharField(max_length=200)
    quantidade_paginas    = models.IntegerField()
    categoria             = models.CharField(max_length=200)
    pagina_atual          = models.IntegerField()
    concluido             = models.BooleanField(default=False)
    imagem                = models.BooleanField(default=False)
    
    

    def __str__(self):
        return self.titulo

    def informacaoLivro(self):
        return self.livro_id, self.titulo, self.autor, self.ano_publicacao