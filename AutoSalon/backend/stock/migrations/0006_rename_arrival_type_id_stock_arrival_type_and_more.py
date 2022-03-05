# Generated by Django 4.0 on 2022-03-02 05:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0014_carphoto'),
        ('stock', '0005_alter_stock_vin'),
    ]

    operations = [
        migrations.RenameField(
            model_name='stock',
            old_name='arrival_type_id',
            new_name='arrival_type',
        ),
        migrations.AddField(
            model_name='stock',
            name='stock_document',
            field=models.FileField(default=1, upload_to='stock-documents/'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='stock',
            name='VIN',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='cars.car'),
        ),
    ]
