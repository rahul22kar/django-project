from django.db import models

class UserModel(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    mobile_number = models.BigIntegerField(unique=True)

class AppointmentStatus(models.TextChoices):
    BOOKED = "BOOKED"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"

class AppointmentModel(models.Model):
    user_id = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    scheduled_at = models.DateTimeField()
    status = models.CharField(choices=AppointmentStatus.choices, default=AppointmentStatus.BOOKED.value, max_length=10)