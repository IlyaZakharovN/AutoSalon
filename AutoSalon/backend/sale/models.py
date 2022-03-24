from django.core.validators import MaxValueValidator, MinLengthValidator, MaxLengthValidator, RegexValidator
from django.db import models
from django.db.models.functions import Length

from add_option.models import AddOption
from cars.models import Car
from employees.models import UserAccount

# Create your models here.

models.CharField.register_lookup(Length)

class PurchaseType(models.Model):
    class PurchaseTypes(models.TextChoices):
        FULL_PRICE = 'Покупка единовременным платежом'
        CREDIT = 'Покупка в кредит'
        TRADE_IN = 'Покупка по программе трейд-ин'

    name = models.CharField(max_length=100, choices=PurchaseTypes.choices, default=PurchaseTypes.FULL_PRICE)
    coefficient = models.FloatField()

    def __str__(self):
        return f'{self.id} - {self.name}, коэффициент - {self.coefficient}'

class SaleType(models.Model):
    class SaleTypes(models.TextChoices):
        STANDARD = 'Обычная продажа'
        PREORDER = 'Предзаказ'
    
    name = models.CharField(max_length=100, choices=SaleTypes.choices, default=SaleTypes.STANDARD)

    def __str__(self):
        return f'{self.name}' 

class SaleStatus(models.Model):
    class SaleStatuses(models.TextChoices):
        COMMITED = 'Совершена'
        CANCELED = 'Отменена'

    name = models.CharField(max_length=100, choices=SaleStatuses.choices, default=SaleStatuses.COMMITED)

    def __str__(self):
        return f'{self.name}'

class Sale(models.Model):
    VIN = models.ForeignKey(
        Car, 
        on_delete=models.DO_NOTHING, # models.SET_DEFAULT, default='A0000000000000000',
        validators=[RegexValidator(r'^(?=.*?\d)(?=.*?[A-Z])[A-Z\d]{17}', 'VIN должен состоять из 17 заглавных букв и цифр.')]
    )

    seller = models.ForeignKey(
        UserAccount, 
        on_delete=models.DO_NOTHING, # models.SET_DEFAULT, default=0, 
        limit_choices_to=(models.Q(is_sales_director=True) | models.Q(is_sales_manager=True) | models.Q(is_superuser=True))
    )

    date = models.DateField()
    purchase_type = models.ForeignKey(PurchaseType, on_delete=models.DO_NOTHING) # on_delete=models.SET_DEFAULT, default=0
    sale_type = models.ForeignKey(SaleType, on_delete=models.DO_NOTHING)
    sale_status = models.ForeignKey(SaleStatus, on_delete=models.DO_NOTHING)
    sale_price = models.DecimalField(max_digits=11, decimal_places=2)
    customer_info = models.TextField(default='Информация о покупателе не указана.')
    sale_document = models.FileField(upload_to='sale-documents/')
    add_option_id = models.ManyToManyField(AddOption, default=0, blank=True)
    note = models.TextField(default='Примечание продажи не указано.', blank=True, null=True)

    # customer_passport = models.CharField(
    #     max_length=10,
    #     validators=[
    #         # MaxValueValidator(9999999999), 
    #         MaxLengthValidator(10),
    #         MinLengthValidator(10),
    #         # RegexValidator('^([(\d)+]){10}$', 'Серия и номер пасспорта должны состоять из 10 цифр.')
    #     ]
    # )

    def __str__(self):
        return f'{self.VIN} - {self.date}; Продавец: {self.seller}'

    # class Meta:
    #     constraints = [
    #         models.CheckConstraint(check=models.Q(customer_passport__length=10), name="passport_length")
    #     ]
        # restrict deleting after 14 days???