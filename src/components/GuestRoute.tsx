import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import Loader from "./Loader";
import { ReactNode, useEffect } from "react";

const GuestRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state);

  useEffect(() => {
    if (!isLoading && user) {
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    }
  }, [isLoading, user, navigate, location]);

  if (isLoading) {
    return <Loader />;
  }

  return children;
};

export default GuestRoute;
