# Generated by Django 4.0 on 2022-02-16 06:07

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0009_alter_car_vin'),
        ('sale', '0017_alter_sale_vin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sale',
            name='VIN',
            field=models.ForeignKey(default='A0000000000000000', on_delete=django.db.models.deletion.SET_DEFAULT, to='cars.car', validators=[django.core.validators.RegexValidator('^[A-Z0-9]{17}$')]),
        ),
    ]