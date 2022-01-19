from django.db import models

from cars.models import Car

# Create your models here.

class ArrivalType(models.Model):
    class ArrivalTypes(models.TextChoices):
        NEW = 'Новый'
        HAS_MILLAGE = 'С пробегом'
        TRADE_IN = 'Трейд-ин'
        RETURNED = 'Возврат'
        AFTER_REPAIR = 'После ремонтных работ'
        UNKNOWN = 'Неизвестно'

    arrival_type_id = models.PositiveSmallIntegerField(primary_key=True, editable=True, default=0)
    name = models.CharField(max_length=100, choices=ArrivalTypes.choices, default=ArrivalTypes.NEW)

    def __str__(self):
        return f'{self.arrival_type_id} - {self.name}'

class Stock(models.Model):
    VIN = models.ForeignKey(Car, on_delete=models.SET_DEFAULT, default=00000000000000000)
    arrival_type_id = models.ForeignKey(ArrivalType, on_delete=models.SET_DEFAULT, default=1)
    purchase_value = models.DecimalField(max_digits=11, decimal_places=2)
    millage = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.VIN}, {self.arrival_type_id}, {self.purchase_value} руб., {self.millage} км'