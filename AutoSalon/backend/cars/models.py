from django.core.validators import MaxValueValidator, RegexValidator
from django.db import models
from django.db.models.functions import Length

from carmodels.models import CarModel

# Create your models here.

models.CharField.register_lookup(Length)

class Car(models.Model):
    class PurposeType(models.TextChoices):
        FOR_SALE = 'Реализация'
        EXPO = 'Выстовочный образец'
        TESTDRIVE = 'Для тест-драйва'
        UNKNOWN = 'Неизвестно'

    VIN = models.CharField(
        primary_key=True, 
        editable=True, 
        max_length=17,
        validators=[RegexValidator('^(([(A-Z)*(\d)*]){17}|([(\d)*(A-Z)*]){17})$', 'VIN должен состоять из 17 заглавных букв и цифр.')]
    ) # , default=11111111111111111, validators=[MaxValueValidator(99999999999999999)]

    model_id = models.ForeignKey(CarModel, on_delete=models.SET_DEFAULT, default=0)
    price = models.DecimalField(max_digits=11, decimal_places=2)
    purpose = models.CharField(max_length=50, choices=PurposeType.choices, default=PurposeType.FOR_SALE)
    note = models.TextField(default='Примечание не найдено.', blank=True, null=True)

    def __str__(self):
        return f'{self.VIN} - {self.model_id} - {self.purpose} - {self.price} руб.'

    class Meta:
        constraints = [
            models.CheckConstraint(check=models.Q(VIN__length=17), name="VIN_length")
        ]