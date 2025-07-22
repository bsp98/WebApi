import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

export const RutaProtegida = ({ rolPermitido }) => {
    const { token, usuario,authLoaded } = useSelector((state) => state.auth);

    //condicion para evitar parpadeo al no haberse cargado lso datos del storage
    if (!authLoaded) {

        return <div>Cargando...</div>;
    }

    if (!token) return <Navigate to="/login" />;

    if (usuario.rolUsuario === rolPermitido) {
        return <Outlet />
    }
    else {
        if (usuario.rolUsuario === "admin") {
            return <Navigate to="/admin/unauthorized" />
        }
        else if (usuario.rolUsuario === "cliente") {
            return <Navigate to="/cliente/unauthorized" />
        }
        else {
            return <Navigate to="/unauthorized" />
        }
    }
}
