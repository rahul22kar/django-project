import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

import { GET_USER } from "../apis/user";
import { routes } from "../routes";

const Login = ({
  userId,
  setUser,
}: {
  userId: string;
  setUser: (userId: string, name: string) => void;
}) => {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [getUser, { loading, error }] = useLazyQuery(GET_USER);
  const navigate = useNavigate();

  const onLoginClick = () => {
    getUser({ variables: { mobileNumber } })
      .then(({ data, error }) => {
        if (!error) {
          const user = data.user;
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
      <h1>Login</h1>
      <div>
        {loading ? (
          <p>Logging In...</p>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                placeholder={"Enter mobile number"}
                type={"number"}
                value={mobileNumber}
                step={1}
                onChange={(ev) => setMobileNumber(ev.target.value)}
                style={{ marginRight: "20px" }}
              />
              <button disabled={!mobileNumber} onClick={onLoginClick}>
                Login
              </button>
            </div>
            <p>Or</p>
            <Link to={routes.signUp}>
              <button>Sign Up</button>
            </Link>
          </>
        )}
        {error && <p style={{ color: "red" }}>Error: Failed to login!</p>}
      </div>
    </div>
  );
};

export default Login;
