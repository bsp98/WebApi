import { createSlice } from '@reduxjs/toolkit';
import { getResumenEstadisticasThunk } from '../thunks/estadisticasThunks';

const initialState = {
    balances: [],
    serviciosEstadistica: [],
    egresos: 0,
    ingresos: 0,
    balance: 0,
    loading: false,
    error: null,
};

const estadisticasSlice = createSlice({
    name: 'estadisticas',
    initialState,
    reducers: {

        setError: (state, action) => {
            state.error = action.payload;
        },

    },
    extraReducers: (builder) => {

        builder
            .addCase(getResumenEstadisticasThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getResumenEstadisticasThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const resumenEstadistica = action.payload;
                state.ingresos = resumenEstadistica.totalIngresos;
                state.egresos = resumenEstadistica.totalEgresos;
                state.balance = resumenEstadistica.balance;
                state.balances = resumenEstadistica.balancesMensuales;
                state.serviciosEstadistica = resumenEstadistica.estadisticasServicios;
            })
            .addCase(getResumenEstadisticasThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});
export const {setError} = estadisticasSlice.actions;
export default estadisticasSlice.reducer;