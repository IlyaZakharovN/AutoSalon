# Generated by Django 4.0 on 2022-03-01 06:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0013_status_remove_car_note_car_description_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='CarPhoto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(upload_to='cars/')),
                ('VIN', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='cars.car')),
            ],
        ),
    ]
