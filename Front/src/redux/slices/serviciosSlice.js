import { createSlice } from '@reduxjs/toolkit';
import { createServicioThunk, deleteServicioThunk, updateServicioThunk, getAllServicioThunk, getByIdServicioThunk, getByCategoryThunk } from '../thunks/serviciosThunks';

const initialState = {
    servicios: [],
    servicioSeleccionado: { //se inicializan los campos para que no se rompa la aplicacion si todavia no obtubo el servicio
        id: 0,
        nombre: '',
        categoriaNombre: '',
        categoria: 0,
        precio: 0,
        descuento: 0,
        disponibilidad: 0,
        tiempoDeDuracionMin: 0,
        descripcion: ''
    },
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
        //Cases de crear servicio
        builder
            .addCase(createServicioThunk.fulfilled, (state, action) => {
                state.error = null;
                state.servicios.push(action.payload); // Se agrega directamente al estado
                state.successMessage = 'Servicio creado exitosamente';
            })
            .addCase(createServicioThunk.rejected, (state, action) => {
                state.error = action.payload;
            });

        //Cases de eliminar servicio
        builder
            .addCase(deleteServicioThunk.fulfilled, (state, action) => {
                state.error = null;
                state.successMessage = action.payload; // guardo el mensaje de eliminado con exito
            })
            .addCase(deleteServicioThunk.rejected, (state, action) => {
                state.error = action.payload;
            });

        //Cases de modificar servicio
        builder
            .addCase(updateServicioThunk.fulfilled, (state, action) => {
                state.error = null;
                state.successMessage = action.payload; // guardo el mensaje de eliminado con exito
            })
            .addCase(updateServicioThunk.rejected, (state, action) => {
                state.error = action.payload;
            });

        //Cases de obtener todos los servicio
        builder
            .addCase(getAllServicioThunk.pending, (state) => {
                state.loading = true;  // Empieza la carga
                state.error = null;    // Limpio error previo
            })
            .addCase(getAllServicioThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.servicios = action.payload; // Se actualiza el estado con los servicios obtenidos
            })
            .addCase(getAllServicioThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        //Cases de obtener servicio por id
        builder
            .addCase(getByIdServicioThunk.fulfilled, (state, action) => {
                state.error = null;
                state.servicioSeleccionado = action.payload; // guardo el servicio obtenido
            })
            .addCase(getByIdServicioThunk.rejected, (state, action) => {
                state.error = action.payload;
            });

        //Cases de obtener servicios por categoria

        builder
            .addCase(getByCategoryThunk.pending, (state) => {
                state.loading = true;  // Empieza la carga
                state.error = null;    // Limpio error previo
            })
            .addCase(getByCategoryThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.servicios = action.payload; // Se actualiza el estado con los servicios obtenidos
            })
            .addCase(getByCategoryThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearSuccessMessage } = serviciosSlice.actions;
export default serviciosSlice.reducer;