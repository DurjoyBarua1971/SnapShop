import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const GuestRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default GuestRoute;
