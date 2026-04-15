import { Navigate } from "react-router";

const ProtectedRoute = ({ children, isLoggedIn, to = "/" }) => {
  if (!isLoggedIn) {
    return <Navigate to={to} replace />;
  }

  return children;
};

export default ProtectedRoute;
