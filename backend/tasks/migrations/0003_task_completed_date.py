# Generated by Django 3.1.7 on 2021-03-04 03:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0002_auto_20210223_2317'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='completed_date',
            field=models.DateField(null=True),
        ),
    ]
