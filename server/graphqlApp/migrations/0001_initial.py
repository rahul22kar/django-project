# Generated by Django 4.2.2 on 2023-07-03 00:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('mobile_number', models.BigIntegerField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='AppointmentModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('scheduled_at', models.DateTimeField()),
                ('status', models.CharField(choices=[('BOOKED', 'Booked'), ('COMPLETED', 'Completed'), ('CANCELLED', 'Cancelled')], default='BOOKED', max_length=10)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='graphqlApp.usermodel')),
            ],
        ),
    ]
