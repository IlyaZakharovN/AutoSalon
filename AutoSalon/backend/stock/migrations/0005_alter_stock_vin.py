# Generated by Django 4.0 on 2022-02-08 11:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0009_alter_car_vin'),
        ('stock', '0004_alter_stock_arrival_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stock',
            name='VIN',
            field=models.ForeignKey(default='A0000000000000000', on_delete=django.db.models.deletion.SET_DEFAULT, to='cars.car'),
        ),
    ]
