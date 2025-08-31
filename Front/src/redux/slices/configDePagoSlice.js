import { createSlice } from '@reduxjs/toolkit';
import { configurarModoDePagoThunk, getModoDePagoThunk } from '../thunks/pagoThunks';
import { guardarModoDePago,obtenerModoDePago } from '../../utils/storage/pagoStorage';


const initialState = {
    formaDePago: obtenerModoDePago(),
    error: null,
};
const configDePagoSlice = createSlice({
    name: 'configDePago',
    initialState,
    reducers: {
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },
        abrirModalEgreso(state, action) {
            state.egresoSeleccionado = action.payload;
            state.modalEgresoAbierto = true;
        },
        cerrarModalEgreso(state) {
            state.modalEgresoAbierto = false;
            state.egresoSeleccionado = null;
        },
    },
    extraReducers: (builder) => {
        //Cases de configurar pago
        builder
            .addCase(configurarModoDePagoThunk.fulfilled, (state, action) => {
                state.error = null;
                const modo = action.payload.tipoDePago;
                console.log("se modifica lo forma de pago", modo);
                state.formaDePago = modo;
                guardarModoDePago(modo);
            })
            .addCase(configurarModoDePagoThunk.rejected, (state, action) => {
                state.error = action.payload;
            });

        //Cases obtener modo de pago
        builder
            .addCase(getModoDePagoThunk.fulfilled, (state, action) => {
                state.error = null;
                const modo = action.payload.tipoDePago;
                state.formaDePago = modo;
                guardarModoDePago(modo);
            })
            .addCase(getModoDePagoThunk.rejected, (state, action) => {
                state.error = action.payload;
            });
    },

});

export default configDePagoSlice.reducer;

