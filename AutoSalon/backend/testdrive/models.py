from datetime import datetime
from django.core.validators import RegexValidator
from django.db import models

from cars.models import Car
from employees.models import UserAccount

# Create your models here.

class TestDriveStatus(models.Model):
    class TD_Status(models.TextChoices):
        NOT_AGREED = ' Заявка не согласована'
        AGREED = 'Заявка согласована'
        CANCELED = 'Отменен'
        DONE = 'Проведен'

    name = models.CharField(max_length=100, choices=TD_Status.choices, default=TD_Status.NOT_AGREED)

    def __str__(self):
        return f'{self.id} - {self.name}'

class TestDrive(models.Model):        
    VIN = models.ForeignKey(
        Car, 
        on_delete=models.SET_DEFAULT, 
        default='A0000000000000000',
        # validators=[RegexValidator('^(([(A-Z)*(\d)*]){17}|([(\d)*(A-Z)*]){17})$', 'VIN должен состоять из 17 заглавных букв и цифр.')]
    )

    date_time = models.DateTimeField()
    seller = models.ForeignKey(UserAccount, on_delete=models.SET_DEFAULT, default=0, blank=True)
    client_name = models.CharField(max_length=255)
    client_phone = models.CharField(validators=[RegexValidator(regex = r"^\+?1?\d{11,11}$")], max_length=12)
    status = models.ForeignKey(TestDriveStatus, on_delete=models.SET_DEFAULT, default=2)

    def __str__(self):
        return f'{self.date_time}, {self.VIN} - {self.seller}'

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['VIN', 'date_time'], name='unique_VIN_datetime'),
            models.CheckConstraint(check=models.Q(date_time__gt=datetime.now()), name='datetime_gt_now'),
            # models.CheckConstraint(check=models.Q(VIN__length=17), name="VIN_td_length")
        ]
    