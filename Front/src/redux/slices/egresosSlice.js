import { createSlice } from '@reduxjs/toolkit';
import { createEgresoThunk, deleteEgresoThunk, getEgresosPaginadosThunk, getByFilterThunk } from '../thunks/egresosThunks';

const initialState = {
    egresos: [],
    egresoSeleccionado:null,
    total: 0,
    currentPage: 1,
    loading: false,
    error: null,
    successMessage: null,
    modalEgresoAbierto: false,
};

const egresosSlice = createSlice({
    name: 'egresos',
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
        //Cases de crear egreso
        builder
            .addCase(createEgresoThunk.fulfilled, (state, action) => {
                state.error = null;
                state.egresos.push(action.payload); // Se agrega directamente al estado
                state.successMessage = action.payload;
            })
            .addCase(createEgresoThunk.rejected, (state, action) => {
                state.error = action.payload;
            });

        //Cases de eliminar egreso
        builder
            .addCase(deleteEgresoThunk.fulfilled, (state, action) => {
                state.error = null;
                state.successMessage = action.payload; // guardo el mensaje de eliminado con exito
            })
            .addCase(deleteEgresoThunk.rejected, (state, action) => {
                state.error = action.payload;
            });

        //Cases de obtener egresos paginados
        builder
            .addCase(getEgresosPaginadosThunk.pending, (state) => {
                state.loading = true;  // Empieza la carga
                state.error = null;    // Limpio error previo
            })
            .addCase(getEgresosPaginadosThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.egresos = action.payload.data;
                state.total = action.payload.totalItems;
                state.currentPage = action.meta.arg.page;
                console.log("egresos retornados paginado",state.egresos)
            })
            .addCase(getEgresosPaginadosThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        //Cases de obtener egresos por categoria o fecha

        builder
            .addCase(getByFilterThunk.pending, (state) => {
                state.loading = true;  // Empieza la carga
                state.error = null;    // Limpio error previo
            })
            .addCase(getByFilterThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.egresos = action.payload; // Se actualiza el estado con los egresos obtenidos
            })
            .addCase(getByFilterThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },


});

export const { clearSuccessMessage, abrirModalEgreso,cerrarModalEgreso} = egresosSlice.actions;
export default egresosSlice.reducer;