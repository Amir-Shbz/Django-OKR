# Generated by Django 4.0.6 on 2022-08-16 09:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_rename_due_data_weeklyitemmodel_due_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='weeklyitemmodel',
            name='due_date',
            field=models.DateTimeField(blank=True, default=None, null=True),
        ),
    ]