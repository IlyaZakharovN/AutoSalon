# Generated by Django 4.0 on 2022-02-10 04:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('add_option', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='addoption',
            name='desciption',
            field=models.TextField(blank=True, default='Описание доп. опции не указано.', null=True),
        ),
    ]