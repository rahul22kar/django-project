import { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_APPOINTMENT } from "../apis/appointments";

const CreateAppointment = ({ userId }: { userId: string }) => {
  const [scheduledAt, setScheduledAt] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [createAppointment, { loading, error }] = useMutation(
    CREATE_APPOINTMENT,
    {
      refetchQueries: "all",
    }
  );

  const onCreateClick = () => {
    const UTCTime = new Date(scheduledAt).toISOString();
    createAppointment({ variables: { userId, scheduledAt: UTCTime } })
      .then(({ errors }) => {
        if (!errors) {
          setScheduledAt("");
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Create Appointments</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          type={"datetime-local"}
          style={{ marginRight: "20px" }}
          value={scheduledAt}
          onChange={(ev) => setScheduledAt(ev.target.value)}
        />
        <button disabled={!scheduledAt || loading} onClick={onCreateClick}>
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
      {error && (
        <p style={{ color: "red" }}>
          Failed to create appointment, Please try again!
        </p>
      )}
      {success && (
        <p style={{ color: "green" }}>Appointment created successfully!</p>
      )}
    </div>
  );
};

export default CreateAppointment;
