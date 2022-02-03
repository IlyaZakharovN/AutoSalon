# Generated by Django 4.0.1 on 2022-01-20 09:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0002_alter_car_vin'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tech_inspection', '0003_alter_techinspection_vin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='techinspection',
            name='VIN',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.SET_DEFAULT, to='cars.car'),
        ),
        migrations.AlterField(
            model_name='techinspection',
            name='inspector',
            field=models.ForeignKey(default=0, limit_choices_to=models.Q(('is_sales_director', True), ('is_tech_inspector', True), ('is_superuser', True), _connector='OR'), on_delete=django.db.models.deletion.SET_DEFAULT, to=settings.AUTH_USER_MODEL),
        ),
    ]