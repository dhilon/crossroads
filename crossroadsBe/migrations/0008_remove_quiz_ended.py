# Generated by Django 4.1.3 on 2022-11-26 01:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crossroadsBe', '0007_rename_year_in_school_storeitem_powerlevel'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='quiz',
            name='ended',
        ),
    ]
