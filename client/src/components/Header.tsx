import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { routes } from "../routes";
import { getUserData } from "../utils/localStorage";

const Header = ({ onLogoutClick }: { onLogoutClick: () => void }) => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const storedUser = getUserData();
    if (storedUser) {
      setName(storedUser.name);
    }
  }, []);

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <p style={{ marginRight: "20px" }}>Hello {name || "User"}!</p>
      <Link
        to={routes.listAppointments}
        style={{
          marginRight: "20px",
          border: "solid 1px black",
          padding: "8px",
        }}
      >
        Appointments
      </Link>
      <Link
        to={routes.createAppointments}
        style={{
          border: "solid 1px black",
          padding: "8px",
        }}
      >
        Create Appointments
      </Link>
      <button onClick={onLogoutClick} style={{ marginLeft: "auto" }}>
        Logout
      </button>
    </div>
  );
};

export default Header;
