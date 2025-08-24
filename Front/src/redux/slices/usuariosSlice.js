import { createSlice } from '@reduxjs/toolkit';
import { updatePasswordThunk, solicitarCodigoThunk, recuperarPasswordThunk,updateDatosPersonalesThunk } from '../thunks/usuariosThunks';

const initialState = {
    error: null,
    successMessage: null,
    codeSentError: null,
    codeSentSuccessMessage: null,
    codeSent: false,
    passwordResetError: null,
    passwordResetSuccessMessage: null,
    emailSeleccionado: null,
};

const usuariosSlice = createSlice({
    name: 'usuarios',
    initialState,
    reducers: {
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },
        clearCodeSentSuccessMessage: (state) => {
            state.codeSentSuccessMessage = null;
        },
        clearPasswordResetSuccessMessage: (state) => {
            state.passwordResetSuccessMessage = null;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        setEmailSeleccionado: (state, action) => {
            state.emailSeleccionado = action.payload;
        },

        resetOlvidoPasswordState: (state) => {
            state.codeSent = false;
            state.codeSentError = null;
            state.codeSentSuccessMessage = null;
            state.passwordResetError = null;
            state.passwordResetSuccessMessage = null;
            state.emailSeleccionado = null;
        },
    },
    extraReducers: (builder) => {
        //Cases cambiar contraseña
        builder
            .addCase(updatePasswordThunk.fulfilled, (state, action) => {
                state.error = null;
                state.successMessage = action.payload;
            })
            .addCase(updatePasswordThunk.rejected, (state, action) => {
                state.error = action.payload;
            });
        //Cases solicitar codigo
        builder
            .addCase(solicitarCodigoThunk.fulfilled, (state, action) => {
                state.codeSentError = null;
                state.codeSentSuccessMessage = "Te enviamos un código de verificación para que puedas restablecer tu contraseña."
                state.codeSent = action.payload;
            })
            .addCase(solicitarCodigoThunk.rejected, (state, action) => {
                state.codeSentError = action.payload;
                state.codeSentSuccessMessage = null;
                state.codeSent = false;
                state.emailSeleccionado = null;
            });

        //Cases recuperar contraseña
        builder
            .addCase(recuperarPasswordThunk.fulfilled, (state) => {
                state.error = null;
                state.passwordResetSuccessMessage = "Tu contraseña ha sido actualizada correctamente.";
                let mensaje = state.passwordResetSuccessMessage;
                console.log("entro al fullfid de recuperar contraseña", mensaje)
            })
            .addCase(recuperarPasswordThunk.rejected, (state, action) => {
                state.passwordResetSuccessMessage = null
                state.error = action.payload;
            });

        //Cases modificar datos personales
        builder
            .addCase(updateDatosPersonalesThunk.fulfilled, (state) => {
                state.error = null;
                state.successMessage = "Datos modificados con exito"
            })
            .addCase(updateDatosPersonalesThunk.rejected, (state, action) => {
                state.successMessage = null
                state.error = action.payload;
            });
    },
});

export const { clearSuccessMessage, setError, clearCodeSentSuccessMessage, clearPasswordResetSuccessMessage, setEmailSeleccionado, resetOlvidoPasswordState } = usuariosSlice.actions;
export default usuariosSlice.reducer;