import React from "react";
import { Navigate } from "react-router-dom";
import { getSession } from "../utils/localStorageUtils";

const ProtectedRoute = ({ role, children }) => {
  const session = getSession();
  if (!session || session.role !== role) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
