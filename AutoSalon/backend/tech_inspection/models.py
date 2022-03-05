from pyexpat import model
from django.core.validators import RegexValidator
from django.db import models

from cars.models import Car
from employees.models import UserAccount

# Create your models here.

class TechInspection(models.Model):
    inspector = models.ForeignKey(
        UserAccount, 
        on_delete=models.DO_NOTHING, # models.SET_DEFAULT, default=0,
        limit_choices_to=(models.Q(is_sales_director=True) | models.Q(is_tech_inspector=True) | models.Q(is_superuser=True))
    )

    VIN = models.ForeignKey(
        Car, 
        on_delete=models.DO_NOTHING, # models.SET_DEFAULT, default='A0000000000000000',
        validators=[RegexValidator('^(([(A-Z)*(\d)*]){17}|([(\d)*(A-Z)*]){17})$', 'VIN должен состоять из 17 заглавных букв и цифр.')]
    )
    
    # conclusion = models.TextField(default='Заключение не предоставлено.')
    start_date = models.DateField()
    end_date = models.DateField(null=True)
    conclusion_file = models.FileField(upload_to='tech-inspection-conclusion/', null=True)
    
    def __str__(self):
        return f'{self.VIN}, {self.start_date} - {self.end_date}, {self.inspector}'

    # class Meta:
    #     constraints = [
    #         models.CheckConstraint(check=models.Q(VIN__length=17), name="VIN_ti_length")
    #     ]

# class Conclusion(models.Model):
#     VIN = models.ForeignKey(
#         Car, 
#         on_delete=models.DO_NOTHING,
#         validators=[RegexValidator('^(([(A-Z)*(\d)*]){17}|([(\d)*(A-Z)*]){17})$', 'VIN должен состоять из 17 заглавных букв и цифр.')]
#     )

#     tech_inspection = models.OneToOneField(TechInspection, on_delete=models.DO_NOTHING)

#     inspector = models.ForeignKey(
#         UserAccount, 
#         on_delete=models.DO_NOTHING, 
#         limit_choices_to=(models.Q(is_sales_director=True) | models.Q(is_tech_inspector=True) | models.Q(is_superuser=True))
#     )

#     conclusion_file = models.FileField(upload_to='tech-inspection-conclusion/')