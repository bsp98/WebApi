import { createSlice } from '@reduxjs/toolkit';
import { createServicioThunk } from '../thunks/serviciosThunks';

const initialState = {
    servicios: [],
    loading: false,
    error: null,
    successMessage: null,
};

const serviciosSlice = createSlice({
    name: 'servicios',
    initialState,
    reducers: {
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createServicioThunk.fulfilled, (state, action) => {
                state.error = null;
                state.servicios.push(action.payload); // Se agrega directamente al estado
                state.successMessage = 'Servicio creado exitosamente';
            })
            .addCase(createServicioThunk.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearSuccessMessage } = serviciosSlice.actions;
export default serviciosSlice.reducer;