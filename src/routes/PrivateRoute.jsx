import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // Replace with actual implementation
  const location = useLocation();
  if (location.pathname === "/signin") {
    return <Navigate to="/signin" />;
  }
  if (location.pathname === "/signup") {
    return <Navigate to="/signup" />;
  }

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
