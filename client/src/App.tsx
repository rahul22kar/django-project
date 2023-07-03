import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import ListAppointments from "./components/ListAppointments";
import CreateAppointment from "./components/CreateAppointment";
import RequireAuth from "./components/RequireAuth";
import SignUp from "./components/SignUp";
import { clearUserData, getUserData, setUserData } from "./utils/localStorage";
import { routes } from "./routes";

import "./App.css";

function App() {
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const setUser = (id: string, name: string) => {
    setUserData(id, name);
    setUserId(id);
  };

  const onLogoutClick = () => {
    clearUserData();
    setUserId("");
  };

  useEffect(() => {
    const storedUser = getUserData();
    if (storedUser) {
      setUserId(storedUser.id);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      setLoading(false);
    }
  }, [userId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="App">
      <Routes>
        <Route
          path={routes.login}
          element={<Login userId={userId} setUser={setUser} />}
        />
        <Route
          path={routes.signUp}
          element={<SignUp userId={userId} setUser={setUser} />}
        />
        <Route
          element={
            <RequireAuth userId={userId} onLogoutClick={onLogoutClick} />
          }
        >
          <Route
            path={routes.listAppointments}
            element={<ListAppointments userId={userId} />}
          />
          <Route
            path={routes.createAppointments}
            element={<CreateAppointment userId={userId} />}
          />
        </Route>
        <Route path="*" element={<Navigate to={routes.login} replace />} />
      </Routes>
    </div>
  );
}

export default App;
