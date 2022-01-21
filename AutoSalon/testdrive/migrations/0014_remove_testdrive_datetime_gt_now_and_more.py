# Generated by Django 4.0.1 on 2022-01-20 09:23

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testdrive', '0013_remove_testdrive_datetime_gt_now_and_more'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='testdrive',
            name='datetime_gt_now',
        ),
        migrations.AddConstraint(
            model_name='testdrive',
            constraint=models.CheckConstraint(check=models.Q(('date_time__gt', datetime.datetime(2022, 1, 20, 12, 23, 17, 82968))), name='datetime_gt_now'),
        ),
    ]
