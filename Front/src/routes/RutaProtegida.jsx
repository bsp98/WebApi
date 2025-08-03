import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

export const RutaProtegida = ({ rolPermitido }) => {
    const {usuario, authLoaded } = useSelector((state) => state.auth);
    const rol = usuario?.rolUsuario || null;
    

    if (!usuario) {
        return <Navigate to="/login" />;
    }
    //condicion para evitar parpadeo al no haberse cargado lso datos del storage
    if (!authLoaded) {
        return <div>Cargando...</div>;
    }

    if (rol === rolPermitido) {
        return <Outlet />
    }
    else {
        if (rol === "Administrador") {
            return <Navigate to="/admin/unauthorized" />
        }
        else if (rol === "Cliente") {
            return <Navigate to="/cliente/unauthorized" />
        }
        else {
            return <Navigate to="/unauthorized" />
        }
    }
}
