# Generated by Django 4.0.6 on 2022-08-16 09:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_rename_builddate_commentmodel_buil_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='weeklyitemmodel',
            name='due_data',
            field=models.DateTimeField(blank=True),
        ),
    ]
