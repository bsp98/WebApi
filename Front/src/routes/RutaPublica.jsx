import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const RutaPublica = () => {
    const { token, usuario } = useAuth();

    if (token && usuario) {
        if (usuario.rolUsuario === "cliente") {
            return <Navigate to="/cliente/inicio" />;
        } else if (usuario.rolUsuario === "admin") {
            return <Navigate to="/admin/inicio" />;
        }
    }

    return <Outlet />;
}
