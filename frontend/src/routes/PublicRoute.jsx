import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PublicRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return null;

    return !user ? children : <Navigate to="/" replace />;
}