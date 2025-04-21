import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import Loader from "./Loader";
import { ReactNode, useEffect } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/login", { replace: true });
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return children;
};

export default ProtectedRoute;
