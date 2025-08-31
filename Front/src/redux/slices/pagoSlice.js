import { createSlice } from '@reduxjs/toolkit';
import { solicitarPagoMercadoPagoThunk } from '../thunks/pagoThunks';


const initialState = {
    urlMercadoPago:null,
    error: null,
    successMessage: null,
};

const pagoSlice = createSlice({
    name: 'pago',
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
        //Cases solicitar pago
        builder
            .addCase(solicitarPagoMercadoPagoThunk.fulfilled, (state, action) => {
                state.error = null;
                const datosDevueltos = action.payload;
                console.log("objeto de vuelto por mercado pago", datosDevueltos)
                state.urlMercadoPago = datosDevueltos.initPoint;
                console.log("se actualizo el estado de la url", state.urlMercadoPago)
            })
            .addCase(solicitarPagoMercadoPagoThunk.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearSuccessMessage, setError} = pagoSlice.actions;
export default pagoSlice.reducer;