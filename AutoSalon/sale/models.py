from django.core.validators import MaxValueValidator
from django.db import models

from add_option.models import AddOption
from cars.models import Car
from employees.models import UserAccount

# Create your models here.

class PurchaseType(models.Model):
    class PurchaseTypes(models.TextChoices):
        FULL_PRICE = 'Покупка единовременным платежом'
        CREDIT = 'Покупка в кредит'
        TRADE_IN = 'Покупка по программе трейд-ин'

    name = models.CharField(max_length=100, choices=PurchaseTypes.choices, default=PurchaseTypes.FULL_PRICE)
    coefficient = models.FloatField()

class Sale(models.Model):
    VIN = models.ForeignKey(Car, on_delete=models.SET_DEFAULT, default=00000000000000000)

    seller = models.ForeignKey(
        UserAccount, 
        on_delete=models.SET_DEFAULT, 
        default=0, 
        limit_choices_to=(models.Q(is_sales_director=True) | models.Q(is_sales_manager=True) | models.Q(is_superuser=True))
    )

    date = models.DateField()
    purchase_type_id = models.ForeignKey(PurchaseType, on_delete=models.SET_DEFAULT, default=0)
    customer_passport = models.PositiveBigIntegerField(validators=[MaxValueValidator(9999999999)])
    add_option_id = models.ManyToManyField(AddOption, default=0)

    def __str__(self):
        return f'{self.VIN - self.date, self.seller}'