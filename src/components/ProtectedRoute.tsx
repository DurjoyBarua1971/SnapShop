import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import Loader from "./Loader";
import { ReactNode, useEffect } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login", {
        state: { from: location.pathname + location.search },
        replace: true,
      });
    }
  }, [isLoading, user, navigate, location]);

  if (isLoading) {
    return <Loader />;
  }

  return children;
};

export default ProtectedRoute;
