import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../store";

interface ProtectedRouteProps {
    children: React.ReactNode
    requireAdmin?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
    const { isAuthenticated, isAdmin } = useAuth()
    const location = useLocation();

    // Si el usuario no está autenticado, redirigir al login
    if (!isAuthenticated) {
        return <Navigate to={isAdmin ? "/admin" : "/login"} state={{ from: location }} replace />
    }

    // Si la ruta requiere ser admin y el usuario no lo es, redirigir a home
    if (requireAdmin && !isAdmin) {
        return <Navigate to="/home" replace />
    }

    // Si el usuario está autenticado y tiene los permisos necesarios, mostrar el componente
    return <>{children}</>
}

export default ProtectedRoute;