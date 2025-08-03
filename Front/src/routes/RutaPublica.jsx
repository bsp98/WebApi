import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const RutaPublica = () => {
    const {usuario} = useAuth();

    if (usuario) {
        if (usuario.rolUsuario === "Cliente") {
            return <Navigate to="/cliente/inicio" />;
        } else if (usuario.rolUsuario === "Administrador") {
            return <Navigate to="/admin/inicio" />;
        }
    }

    return <Outlet />;
}
