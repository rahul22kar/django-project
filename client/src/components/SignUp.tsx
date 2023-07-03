import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

import { CREATE_USER } from "../apis/user";
import { routes } from "../routes";

const Signup = ({
  userId,
  setUser,
}: {
  userId: string;
  setUser: (userId: string, name: string) => void;
}) => {
  const [mobileNumber, setMobileNumber] = useState<number>();
  const [name, setName] = useState<string>("");
  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  const onSignupClick = () => {
    createUser({ variables: { mobileNumber, name } })
      .then(({ data, errors }) => {
        if (!errors) {
          const user = data.createUser.user;
          setUser(user.id, user.name);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (userId) {
      navigate(routes.listAppointments);
    }
    //eslint-disable-next-line
  }, [userId]);

  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <h1>Signup</h1>
      <div>
        {loading ? (
          <p>Signing In...</p>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                placeholder={"Enter mobile number"}
                type={"number"}
                value={mobileNumber}
                step={1}
                onChange={(ev) => setMobileNumber(parseInt(ev.target.value))}
                style={{ marginRight: "20px" }}
              />
              <input
                placeholder={"Enter name"}
                type={"text"}
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                style={{ marginRight: "20px" }}
              />
              <button disabled={!mobileNumber || !name} onClick={onSignupClick}>
                SignUp
              </button>
            </div>
            <p>Or</p>
            <Link to={routes.login}>
              <button>Log In</button>
            </Link>
          </>
        )}
        {error && <p style={{ color: "red" }}>Error: Failed to signup!</p>}
      </div>
    </div>
  );
};

export default Signup;
