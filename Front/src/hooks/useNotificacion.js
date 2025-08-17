import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { enviarMensajeContactoThunk } from '../redux/thunks/notificacionThunks';
import { clearSuccessMessage} from '../redux/slices/notificacionSlice';

export const useNotificacion = () => {
    const dispatch = useDispatch();
    const { error, loading, successMessage } = useSelector((state) => state.notificacion);

    const enviarMensajeContacto = (e) => {
        e.preventDefault();
        const form = e.target;


        const nuevoMensaje = {
            nombre: form.nombre.value,
            apellido: form.apellido.value,
            email: form.email.value,
            telefono: form.telefono.value,
            mensaje: form.mensaje.value,
        };

        dispatch(enviarMensajeContactoThunk(nuevoMensaje));
    };

    const limpiarMensajeExito = () => {
        dispatch(clearSuccessMessage());
    };

    return {
        loading,
        error,
        successMessage,
        limpiarMensajeExito,
        enviarMensajeContacto,
    };
}
