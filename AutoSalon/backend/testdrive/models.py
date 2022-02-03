from datetime import datetime
from django.core.validators import RegexValidator
from django.db import models
from django.forms import ValidationError

from cars.models import Car
from employees.models import UserAccount

# Create your models here.

class TestDrive(models.Model):
    VIN = models.ForeignKey(Car, on_delete=models.SET_DEFAULT, default=00000000000000000)
    date_time = models.DateTimeField()
    seller = models.ForeignKey(UserAccount, on_delete=models.SET_DEFAULT, default=0)
    client_name = models.CharField(max_length=255)
    client_phone = models.CharField(validators=[RegexValidator(regex = r"^\+?1?\d{11,11}$")], max_length=12)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['VIN', 'date_time'], name='unique_VIN_datetime'),
            models.CheckConstraint(check=models.Q(date_time__gt=datetime.now()), name='datetime_gt_now'),
        ]
    
    def __str__(self):
        return f'{self.date_time}, {self.VIN} - {self.seller}'