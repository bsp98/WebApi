import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    formaDePago: 0,
};

const configDePagoSlice = createSlice({
    name: 'configDePago',
    initialState,
    reducers: {
        activarPagoAnticipado: (state) => {
            state.formaDePago = 1;
            alert("el estado de pago ahora es 1")
        },

        activarPagoAlFinalizar: (state) => {
            state.formaDePago = 0;
            alert("el estado de pago ahora es 0")
        }

    }
});

export const { activarPagoAnticipado,activarPagoAlFinalizar } = configDePagoSlice.actions;
export default configDePagoSlice.reducer;

