import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import Loader from "./Loader";
import { ReactNode, useEffect } from "react";

const GuestRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading) {
      navigate("/", { replace: true });
    }
  }, [isLoading, user]);

  if (isLoading) {
    return <Loader />;
  }

  return children;
};

export default GuestRoute;
