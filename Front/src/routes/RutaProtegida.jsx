import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

export const RutaProtegida = ({ rolPermitido }) => {
    const { token, usuario,authLoaded } = useSelector((state) => state.auth);
     const rol = usuario?.rolUsuario || null;

   //condicion para evitar parpadeo al no haberse cargado lso datos del storage
    if (!authLoaded) {

        return <div>Cargando...</div>;
    }

    if (!token) return <Navigate to="/login" />;

    console.log("va realizar la validacion del rol",{rol,rolPermitido})

    if (rol === rolPermitido) {
        console.log("entro al if para renderizar el outlet",{rol,rolPermitido})
        return <Outlet />
    }
    else {
        if (rol === "admin") {
            return <Navigate to="/admin/unauthorized" />
        }
        else if (rol === "cliente") {
            return <Navigate to="/cliente/unauthorized" />
        }
        else {
            return <Navigate to="/unauthorized" />
        }
    }
}
