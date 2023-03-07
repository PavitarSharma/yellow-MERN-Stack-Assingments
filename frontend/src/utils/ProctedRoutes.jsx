import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProctedRoutes = () => {
  const { token, user } = useSelector((state) => state.auth);
  

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProctedRoutes;