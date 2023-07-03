import { gql } from "@apollo/client";

export const GET_APPOINTMENTS = gql`
  query getAppointments($userId: ID!) {
    appointments(userId: $userId) {
      id
      status
      scheduledAt
      createdAt
    }
  }
`;

export const CREATE_APPOINTMENT = gql`
  mutation createAppointment($userId: ID!, $scheduledAt: DateTime!) {
    createAppointment(
      appointmentData: { userId: $userId, scheduledAt: $scheduledAt }
    ) {
      appointment {
        status
      }
    }
  }
`;

export const CANCEL_APPOINTMENT = gql`
  mutation cancelAppointment($userId: ID!, $appointmentId: ID!) {
    cancelAppointment(userId: $userId, appointmentId: $appointmentId) {
      appointment {
        id
      }
    }
  }
`;
