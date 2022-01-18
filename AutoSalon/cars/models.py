from django.db import models

from carmodels.models import CarModel

# Create your models here.

class Car(models.Model):
    class PurposeType(models.TextChoices):
        FOR_SALE = 'Реализация'
        EXPO = 'Выстовочный образец'
        TESTDRIVE = 'Для тест-драйва'
        UNKNOWN = 'Неизвестно'

    VIN = models.PositiveBigIntegerField(primary_key=True, editable=True, default=11111111111111111)
    model_id = models.ForeignKey(CarModel, on_delete=models.SET_DEFAULT, default=0)
    purpose = models.CharField(max_length=50, choices=PurposeType.choices, default=PurposeType.FOR_SALE)

    def __str__(self):
        return f'{self.VIN} - {self.model_id} - {self.purpose}'