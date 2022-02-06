from datetime import datetime
from django.core.validators import RegexValidator
from django.db import models

from cars.models import Car
from employees.models import UserAccount

# Create your models here.

class TestDrive(models.Model):
    VIN = models.ForeignKey(
        Car, 
        on_delete=models.SET_DEFAULT, 
        default='A0000000000000000',
        # validators=[RegexValidator('^(([(A-Z)*(\d)*]){17}|([(\d)*(A-Z)*]){17})$', 'VIN должен состоять из 17 заглавных букв и цифр.')]
    )

    date_time = models.DateTimeField()
    seller = models.ForeignKey(UserAccount, on_delete=models.SET_DEFAULT, default=0)
    client_name = models.CharField(max_length=255)
    client_phone = models.CharField(validators=[RegexValidator(regex = r"^\+?1?\d{11,11}$")], max_length=12)

    def __str__(self):
        return f'{self.date_time}, {self.VIN} - {self.seller}'

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['VIN', 'date_time'], name='unique_VIN_datetime'),
            models.CheckConstraint(check=models.Q(date_time__gt=datetime.now()), name='datetime_gt_now'),
            # models.CheckConstraint(check=models.Q(VIN__length=17), name="VIN_td_length")
        ]
    