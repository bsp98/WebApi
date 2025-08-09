import React from 'react'
import { updatePasswordThunk, solicitarCodigoThunk, recuperarPasswordThunk } from '../redux/thunks/usuariosThunks';
import { useSelector, useDispatch } from 'react-redux';
import { clearSuccessMessage, setError, clearCodeSentSuccessMessage, clearPasswordResetSuccessMessage, setEmailSeleccionado,resetOlvidoPasswordState } from '../redux/slices/usuariosSlice';

export const useUsuarios = () => {
    const { error, successMessage, email, codeSent, codeSentError, codeSentSuccessMessage, passwordResetError, passwordResetSuccessMessage, emailSeleccionado } = useSelector((state) => state.usuarios);
    const dispatch = useDispatch();


    const cambiarContrasena = (e) => {
        e.preventDefault();

        const form = e.target;
        const currentPassword = form.currentPassword.value;
        const newPassword = form.newPassword.value;
        const passwordRepeat = form.passwordRepeat.value;

        const passwordValidate = newPassword === passwordRepeat;

        if (!passwordValidate) {
            dispatch(setError("La contraseña y su confirmación deben ser iguales."));
        }


        if (passwordValidate) {
            const datosUpdatePassword = {
                passwordActual: currentPassword,
                nuevaPassword: newPassword,
            }

            dispatch(updatePasswordThunk(datosUpdatePassword));
        }
    }

    const solicitarCodigo = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;

        if(email) {
            dispatch(setEmailSeleccionado(email));
        }

        dispatch(solicitarCodigoThunk(email));
    }

    const recuperarContrasena = (e) => {
        e.preventDefault();

        const form = e.target;
        const codigoVerificacion = form.codigo.value;
        const newPassword = form.newPassword.value;
        const passwordRepeat = form.passwordRepeat.value;

        const passwordValidate = newPassword === passwordRepeat;

        if (!passwordValidate) {
            dispatch(setError("La contraseña y su confirmación deben ser iguales."));
        }


        if (passwordValidate) {
            const datosRecuperacion = {
                email: emailSeleccionado,
                codigo: codigoVerificacion,
                nuevaPassword: newPassword,
            }

            dispatch(recuperarPasswordThunk(datosRecuperacion));
        }
    }



    const limpiarMensajeExito = () => {
        dispatch(clearSuccessMessage());
    };

    const limpiarMensajeCodigoEnviado = () => {
        dispatch(clearCodeSentSuccessMessage());
    };


    const limpiarMensajeResetPassword = () => {
        dispatch(clearPasswordResetSuccessMessage());
    };

    const limpiarEstadosOlvideContrasena = () =>{
        dispatch(resetOlvidoPasswordState());
    }


    return {
        successMessage,
        error,
        cambiarContrasena,
        limpiarMensajeExito,
        solicitarCodigo,
        recuperarContrasena,
        limpiarMensajeResetPassword,
        limpiarMensajeCodigoEnviado,
        codeSent,
        codeSentError,
        codeSentSuccessMessage,
        passwordResetError,
        passwordResetSuccessMessage,
        limpiarEstadosOlvideContrasena,
    }

}
