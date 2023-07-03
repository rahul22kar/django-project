import { Navigate, Outlet } from "react-router-dom";
import { routes } from "../routes";
import Header from "./Header";
import React from "react";

const RequireAuth = ({
  userId,
  onLogoutClick,
}: {
  userId: string;
  onLogoutClick: () => void;
}) => {
  if (!userId) {
    return <Navigate to={routes.login} />;
  }

  return (
    <>
      <Header onLogoutClick={onLogoutClick} />
      <Outlet />
    </>
  );
};

export default RequireAuth;
