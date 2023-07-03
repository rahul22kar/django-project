import graphene
from graphene_django import DjangoObjectType

from graphqlApp.models import UserModel, AppointmentModel, AppointmentStatus


class UserType(DjangoObjectType):
    class Meta:
        model = UserModel

class AppointmentType(DjangoObjectType):
    class Meta:
        model = AppointmentModel
class Query(graphene.ObjectType):
    user = graphene.Field(UserType, mobile_number=graphene.BigInt())
    appointments = graphene.List(AppointmentType, user_id=graphene.ID())

    @staticmethod
    def resolve_user(self, info, mobile_number):
        return UserModel.objects.get(mobile_number=mobile_number)

    @staticmethod
    def resolve_appointments(self, info, user_id):
        return AppointmentModel.objects.filter(user_id_id=user_id)

class UserInput(graphene.InputObjectType):
    id = graphene.ID()
    name = graphene.String()
    mobile_number = graphene.BigInt()

class AppointmentInput(graphene.InputObjectType):
    id = graphene.ID()
    user_id = graphene.ID()
    scheduled_at = graphene.DateTime()

class CreateUser(graphene.Mutation):
    class Arguments:
        user_data = UserInput(required=True)

    user = graphene.Field(UserType)

    @staticmethod
    def mutate(root, info, user_data=None):
        user_instance = UserModel(
            name=user_data.name,
            mobile_number=user_data.mobile_number
        )
        user_instance.save()
        return CreateUser(user=user_instance)

class CreateAppointment(graphene.Mutation):
    class Arguments:
        appointment_data = AppointmentInput(required=True)

    appointment = graphene.Field(AppointmentType)

    @staticmethod
    def mutate(root, info, appointment_data=None):
        user = UserModel.objects.get(id=appointment_data.user_id)
        appointment_instance = AppointmentModel(
            user_id=user,
            scheduled_at=appointment_data.scheduled_at
        )
        appointment_instance.save()
        return CreateAppointment(appointment=appointment_instance)

class CancelAppointment(graphene.Mutation):
    class Arguments:
        appointment_id = graphene.ID()
        user_id = graphene.ID()

    appointment = graphene.Field(AppointmentType)

    @staticmethod
    def mutate(root, info, appointment_id=None, user_id=None):
        user = UserModel.objects.get(id=user_id)
        appointment_instance = AppointmentModel.objects.get(id=appointment_id, user_id=user)
        appointment_instance.status = AppointmentStatus.CANCELLED.value
        appointment_instance.save()
        return CancelAppointment(appointment=appointment_instance)

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    create_appointment = CreateAppointment.Field()
    cancel_appointment = CancelAppointment.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)

