# Generated by Django 4.0 on 2022-02-05 14:52

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0009_alter_car_vin'),
        ('stock', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stock',
            name='VIN',
            field=models.ForeignKey(default='A0000000000000000', on_delete=django.db.models.deletion.SET_DEFAULT, to='cars.car', validators=[django.core.validators.RegexValidator('^(([(A-Z)*(\\d)*]){17}|([(\\d)*(A-Z)*]){17})$', 'VIN должен состоять из 17 заглавных букв и цифр.')]),
        ),
    ]