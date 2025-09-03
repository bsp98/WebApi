import { createSlice } from '@reduxjs/toolkit';
import { getByCategoryThunk, createPublicacionThunk, deletePublicacionThunk } from '../thunks/publicacionesThunks';

const initialState = {
    publicaciones: [],
    error: null,
    successMessage: null,
    loading: false,
};

const publicacionesSlice = createSlice({
    name: 'publicaciones',
    initialState,
    reducers: {
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },

        setError: (state, action) => {
            state.error = action.payload
        }
    },
    extraReducers: (builder) => {

        //Cases de crear publicacion
        builder
            .addCase(createPublicacionThunk.fulfilled, (state, action) => {
                state.error = null;
                state.publicaciones.push(action.payload); // Se agrega directamente al estado
                state.successMessage = 'Publicación creada con exito';
            })
            .addCase(createPublicacionThunk.rejected, (state, action) => {
                state.error = action.payload;
            });

        //Cases de obtener publicaciones por categoria
        builder
            .addCase(getByCategoryThunk.pending, (state) => {
                state.loading = true;  // Empieza la carga
                state.error = null;    // Limpio error previo
            })
            .addCase(getByCategoryThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.publicaciones = action.payload; // Se actualiza el estado con las publicaciones obtenidos
            })
            .addCase(getByCategoryThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        //Cases de eliminar publicacion
        builder
            .addCase(deletePublicacionThunk.fulfilled, (state, action) => {
                state.error = null;
                state.successMessage = action.payload; // guardo el mensaje de eliminado con exito
            })
            .addCase(deletePublicacionThunk.rejected, (state, action) => {
                state.error = action.payload;
            });

    },
});

export const { clearSuccessMessage,setError } = publicacionesSlice.actions;
export default publicacionesSlice.reducer;