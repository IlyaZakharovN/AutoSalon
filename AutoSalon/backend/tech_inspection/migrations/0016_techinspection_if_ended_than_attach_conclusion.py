# Generated by Django 4.0 on 2022-03-27 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tech_inspection', '0015_remove_techinspection_if_ended_than_attach_conclusion'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='techinspection',
            constraint=models.CheckConstraint(check=models.Q(models.Q(('conclusion_file__isnull', False), ('end_date__isnull', False)), models.Q(('conclusion_file__isnull', True), ('end_date__isnull', True)), _connector='OR'), name='if_ended_than_attach_conclusion'),
        ),
    ]
