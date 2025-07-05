import { createSlice } from '@reduxjs/toolkit';
import { createClienteThunk, deleteClienteThunk, getAllClienteThunk, getByFilterThunk, getClientesPaginadosThunk } from '../thunks/clientesThunks';

const initialState = {
    clientes: [],
    total: 0,
    currentPage:1,
    loading: false,
    error: null,
    successMessage: null,
};

const clientesSlice = createSlice({
    name: 'clientes',
    initialState,
    reducers: {
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },

        setError: (state, action) => {
            state.error = action.payload;
        }

    },
    extraReducers: (builder) => {
        //Cases de crear cliente
        builder
            .addCase(createClienteThunk.fulfilled, (state, action) => {
                state.error = null;
                state.clientes.push(action.payload); // Se agrega directamente al estado
                state.successMessage = 'Cliente creado exitosamente';
            })
            .addCase(createClienteThunk.rejected, (state, action) => {
                state.error = action.payload;
            });

        //Cases de eliminar cliente
        builder
            .addCase(deleteClienteThunk.fulfilled, (state, action) => {
                state.error = null;
                state.successMessage = action.payload; // guardo el mensaje de eliminado con exito
            })
            .addCase(deleteClienteThunk.rejected, (state, action) => {
                state.error = action.payload;
            });


        //Cases de obtener todos los clientes
        builder
            .addCase(getAllClienteThunk.pending, (state) => {
                state.loading = true;  // Empieza la carga
                state.error = null;    // Limpio error previo
            })
            .addCase(getAllClienteThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.clientes = action.payload; // Se actualiza el estado con los clientes obtenidos
            })
            .addCase(getAllClienteThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        //Cases de obtener clientes por nombre o fecha

        builder
            .addCase(getByFilterThunk.pending, (state) => {
                state.loading = true;  // Empieza la carga
                state.error = null;    // Limpio error previo
            })
            .addCase(getByFilterThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.clientes = action.payload; // Se actualiza el estado con los clientes obtenidos
            })
            .addCase(getByFilterThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        //Cases de obtener clientes paginados
        builder
            .addCase(getClientesPaginadosThunk.pending, (state) => {
                state.loading = true;  // Empieza la carga
                state.error = null;    // Limpio error previo
            })
            .addCase(getClientesPaginadosThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.clientes = action.payload.data;
                state.total = action.payload.totalItems;
                state.currentPage = action.meta.arg.page;
            })
            .addCase(getClientesPaginadosThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearSuccessMessage, setError } = clientesSlice.actions;
export default clientesSlice.reducer;