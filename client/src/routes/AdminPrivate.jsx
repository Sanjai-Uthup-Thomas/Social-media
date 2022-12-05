import { Navigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateAdmin = () => {
    const {
        auth: { admin_token }
    } = useSelector(state => state);

    const location = useLocation();

    return admin_token ? <Outlet /> : <Navigate to="/admin" state={{ from: location }} replace />;
};