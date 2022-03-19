from django.core.validators import MaxValueValidator, RegexValidator
from django.db import models
from django.db.models.functions import Length

from carmodels.models import CarModel

# Create your models here.

models.CharField.register_lookup(Length)

class Purpose(models.Model):
    class PurposeType(models.TextChoices):
        FOR_SALE = 'Реализация'
        EXPO = 'Выстовочный образец'
        TESTDRIVE = 'Для тест-драйва'
        UNKNOWN = 'Неизвестно'
    
    name = models.CharField(max_length=100, choices=PurposeType.choices, default=PurposeType.FOR_SALE)

    def __str__(self):
        return f'{self.name}'

class Status(models.Model):
    class StatusType(models.TextChoices):
        IN_STOCK = 'В наличии'
        TECH_INSPECTION = 'На техосмотре'
        TECH_MAINTENANCE = 'На техоблуживании'
        SOLD = 'Продан'
        ACCEPTANCE = 'Проходит приемку'
        UNKNOWN = 'Неизвестно'

    name = models.CharField(max_length=100, choices=StatusType.choices, default=StatusType.UNKNOWN)

    def __str__(self):
        return f'{self.name}'

class Car(models.Model):
    VIN = models.CharField(
        primary_key=True, 
        editable=True, 
        max_length=17,
        validators=[RegexValidator('^(([(A-Z)*(\d)*]){17}|([(\d)*(A-Z)*]){17})$', 'VIN должен состоять из 17 заглавных букв и цифр.')]
    ) # , default=11111111111111111, validators=[MaxValueValidator(99999999999999999)]

    model_id = models.ForeignKey(CarModel, on_delete=models.SET_DEFAULT, default=0)
    price = models.DecimalField(max_digits=11, decimal_places=2)
    purpose = models.ForeignKey(Purpose, on_delete=models.SET_DEFAULT, default=1)
    status = models.ForeignKey(Status, on_delete=models.SET_DEFAULT, default=5)
    description = models.TextField(default='Описание не найдено.', blank=True, null=True)
    note = models.TextField(default='Примечание не найдено.', blank=True, null=True)

    def __str__(self):
        return f'{self.VIN} - {self.model_id} - {self.purpose} - {self.price} руб.'

    class Meta:
        constraints = [
            models.CheckConstraint(check=models.Q(VIN__length=17), name="VIN_length")
        ]

class CarPhoto(models.Model):
    VIN = models.ForeignKey(Car, on_delete=models.DO_NOTHING)
    photo = models.ImageField(upload_to='cars/')

    def __str__(self):
        return f'{self.id}: {self.VIN}'