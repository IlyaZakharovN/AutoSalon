from django.db import models

# Create your models here.

class AddOption(models.Model):
    name = models.CharField(max_length=255, unique=True)
    price = models.DecimalField(max_digits=11, decimal_places=2)
    
    def __str__(self):
        return f'{self.name} - {self.price} руб.' 