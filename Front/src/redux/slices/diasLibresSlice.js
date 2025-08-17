import { createSlice } from '@reduxjs/toolkit';
import { createDiaLibreThunk, deleteDiaLibreThunk, getAllDiaLibreThunk} from '../thunks/diasLibresThunks';

const initialState = {
    diasLibres: [],
    loading: false,
    error: null,
    successMessage: null,
};

const diasLibresSlice = createSlice({
    name: 'diasLibres',
    initialState,
    reducers: {
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        //Cases de crear dia libre
        builder
            .addCase(createDiaLibreThunk.fulfilled, (state, action) => {
                state.error = null;
                state.diasLibres.push(action.payload); // Se agrega directamente al estado
                state.successMessage = 'Día agregado exitosamente';
            })
            .addCase(createDiaLibreThunk.rejected, (state, action) => {
                state.error = action.payload;
            });

        //Cases de eliminar dia libre
        builder
            .addCase(deleteDiaLibreThunk.fulfilled, (state, action) => {
                state.error = null;
                state.successMessage = action.payload; // guardo el mensaje de eliminado con exito
            })
            .addCase(deleteDiaLibreThunk.rejected, (state, action) => {
                state.error = action.payload;
            });

        //Cases de obtener todos los dias libres
        builder
            .addCase(getAllDiaLibreThunk.pending, (state) => {
                state.loading = true;  // Empieza la carga
                state.error = null;    // Limpio error previo
            })
            .addCase(getAllDiaLibreThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.diasLibres = action.payload; // Se actualiza el estado con los servicios obtenidos
            })
            .addCase(getAllDiaLibreThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearSuccessMessage } = diasLibresSlice.actions;
export default diasLibresSlice.reducer;