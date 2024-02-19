import datetime

from django.core.mail import send_mail

from config import settings
from api.models.usuario import Usuario
from api.models.historico import Historico
from api.models.email import Email

email = Usuario.email
data_leitura = Historico.data_leitura

hoje = datetime.datetime.now()
data_limite = hoje - datetime.timedelta(days=2)
    

def envia_email(request):
    if data_leitura < data_limite:
        send_mail('Atualize sua leitura', 'Já faz um tempinho que você não atualiza o sua leitura. \n\nAbra seu CLP e matenha ela em dia.', settings.EMAIL_HOST_USER, [email])
