// src/components/PrivateRoute.tsx

import React from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";

interface PrivateRouteProps {
  path: string,
  element: React.ReactNode;
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  element,
  isAuthenticated,
}) => {
  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
