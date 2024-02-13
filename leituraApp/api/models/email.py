from django.db import models

from config import settings

class Email(models.Model):
    email = models.EmailField(unique=True)
    self_email = settings.EMAIL_HOST_USER

    def __str__(self):
        return self.self_email