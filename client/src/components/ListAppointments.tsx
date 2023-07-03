import { useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";

import { CANCEL_APPOINTMENT, GET_APPOINTMENTS } from "../apis/appointments";

const ListAppointments = ({ userId }: { userId: string }) => {
  const [getAppointments, { loading, error, data }] = useLazyQuery(
    GET_APPOINTMENTS,
    {
      variables: { userId },
    }
  );
  const [cancelAppointmentMutate, cancelAppointmentState] = useMutation(
    CANCEL_APPOINTMENT,
    {
      refetchQueries: "all",
    }
  );

  const cancelAppointment = (appointmentId: string) => {
    cancelAppointmentMutate({
      variables: { userId, appointmentId },
    });
  };

  useEffect(() => {
    getAppointments();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Appointments</h1>
      {loading || cancelAppointmentState.loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: Failed to load! please try again</p>
      ) : data && data.appointments.length > 0 ? (
        <div style={{ maxWidth: "900px", margin: "auto" }}>
          {data.appointments.map((appointment: any) => (
            <div style={{ display: "flex" }}>
              <p
                style={{
                  marginRight: "20px",
                  width: "20px",
                  textAlign: "start",
                }}
              >
                {appointment.id}
              </p>
              <p style={{ marginRight: "20px", width: "240px" }}>
                {new Date(appointment.scheduledAt).toLocaleString()}
              </p>
              <p
                style={{
                  marginRight: "20px",
                  width: "100px",
                  textAlign: "start",
                }}
              >
                {appointment.status}
              </p>
              {appointment.status === "BOOKED" && (
                <button
                  onClick={() => cancelAppointment(appointment.id)}
                  style={{ maxHeight: "24px", margin: "auto 0 auto 0" }}
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
          {!!cancelAppointmentState.error && (
            <p style={{ color: "red" }}>
              Error: Failed to cancel appointment! please try again
            </p>
          )}
        </div>
      ) : (
        <p>No appointments created!</p>
      )}
    </div>
  );
};

export default ListAppointments;
