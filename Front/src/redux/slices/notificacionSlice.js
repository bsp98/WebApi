import { createSlice } from '@reduxjs/toolkit';
import {enviarMensajeContactoThunk} from '../thunks/notificacionThunks';

const initialState = {
    loading: false,
    error: null,
    successMessage: null,
};

const notificacionSlice = createSlice({
    name: 'notificacion',
    initialState,
    reducers: {
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        //Cases notificacion info contacto
        builder
            .addCase(enviarMensajeContactoThunk.fulfilled, (state, action) => {
                state.error = null;
                state.successMessage = action.payload;
            })
            .addCase(enviarMensajeContactoThunk.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearSuccessMessage, setError, setClientes } = notificacionSlice.actions;
export default notificacionSlice.reducer;