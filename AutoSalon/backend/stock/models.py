from datetime import date
from django.core.validators import RegexValidator
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
        return f'{self.name}'

class Stock(models.Model):
    VIN = models.ForeignKey(
        Car, 
        on_delete=models.DO_NOTHING, # models.SET_DEFAULT, default='A0000000000000000',
        # validators=[RegexValidator('^(([(A-Z)*(\d)*]){17}|([(\d)*(A-Z)*]){17})$', 'VIN должен состоять из 17 заглавных букв и цифр.')]
    )
    arrival_type = models.ForeignKey(ArrivalType, on_delete=models.SET_DEFAULT, default=1)
    arrival_date = models.DateField()
    purchase_value = models.DecimalField(max_digits=11, decimal_places=2)
    millage = models.PositiveIntegerField()
    stock_document = models.FileField(upload_to='stock-documents/')

    def __str__(self):
        return f'{self.VIN}, - {self.arrival_date}, {self.arrival_type_id}, {self.purchase_value} руб., {self.millage} км'

    # class Meta:
    #     constraints = [
    #         # models.CheckConstraint(check=models.Q(VIN__length=17), name="VIN_stock_length"),
    #         # models.CheckConstraint(check=models.Q(date_time__gt=date.today()), name='datetime_gt_now'),
    #     ]