from django.db import models

from cars.models import Car
from employees.models import UserAccount

# Create your models here.

class TechInspection(models.Model):
    inspector = models.ForeignKey(
        UserAccount, 
        on_delete=models.SET_DEFAULT, 
        default=0,
        limit_choices_to=(models.Q(is_sales_director=True) | models.Q(is_tech_inspector=True) | models.Q(is_superuser=True))
        )

    VIN = models.ForeignKey(Car, on_delete=models.SET_DEFAULT, default=00000000000000000)
    conclusion = models.TextField(default='Заключение не предоставлено.')
    start_date = models.DateField()
    end_date = models.DateField(null=True)
    
    def __str__(self):
        return f'{self.VIN}, {self.start_date} - {self.end_date}, {self.inspector}'