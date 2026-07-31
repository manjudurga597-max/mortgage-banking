import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
        return <Navigate to="/" />;
    }

    if (role && (!user.role || user.role.toLowerCase() !== role.toLowerCase())) {
        return <Navigate to="/dashboard" />;
    }

    return children;
}

export default ProtectedRoute;