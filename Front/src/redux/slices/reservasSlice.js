import { createSlice } from '@reduxjs/toolkit';
import { createReservaThunk, deleteReservaThunk, reagendarReservaThunk, getAllReservaThunk, getByIdReservaThunk, getReservasByIdClienteThunk, getByFilterThunk, getAvailableTimesThunk, getReservasByDateThunk, ModifyPaymentStatusThunk } from '../thunks/reservasThunks';

const initialState = {
    reservas: [],
    horarios: [],
    horarioSeleccionado: '',
    fechaSeleccionada: '',
    reservaSeleccionada: null,
    reservaEnEdicion: {
        id: 0,
        fecha: '',
        horaInicio: '',
        horaFin: '',
        estadoDePago: 1,
        nombreEstadoDePago: '',
        cliente: {
            id: 0,
            nombre: '',
            apellido: '',
            email: '',
            password: '',
            origenCreacion: '',
            fechaDeNacimiento: '',
            celular: '',
            activo: true
        },
        servicio: {
            id: 0,
            nombre: '',
            descripcion: '',
            precio: 0,
            descuento: 0,
            disponibilidad: 0,
            categoria: 0,
            categoriaNombre: '',
            disponibilidadNombre: '',
            tiempoDeDuracionMin: 0,
            precioTotal: 0
        }
    },
    total: 0,
    currentPage: 1,
    loading: false,
    error: null,
    horarioOcupadoError: null,
    successMessage: null,
    modalReservaAbierto: false,
};

const reservasSlice = createSlice({
    name: 'reservas',
    initialState,
    reducers: {
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },

        clearErrorMessage: (state) => {
            state.error = null;
        },

        setError: (state,action) => {
            state.error = action.payload;
        },

        setFecha: (state, action) => {
            state.fechaSeleccionada = action.payload;
        },

        setHorario: (state, action) => {
            state.horarioSeleccionado = action.payload;
        },
        abrirModalReserva(state, action) {
            state.reservaSeleccionada = action.payload;
            state.modalReservaAbierto = true;
        },
        cerrarModalReserva(state) {
            state.modalReservaAbierto = false;
            state.reservaSeleccionada = null;
        },
        setReservaEnEdicion(state, action) {
            state.reservaEnEdicion = action.payload;
        },
        clearHorarioOcupadoError(state){
            state.horarioOcupadoError = null;
        }
    },
    extraReducers: (builder) => {
        //Cases de crear reserva
        builder
            .addCase(createReservaThunk.fulfilled, (state, action) => {
                state.error = null;
                state.reservas.push(action.payload); // Se agrega directamente al estado
                state.successMessage = 'Reserva creada exitosamente';
            })
            .addCase(createReservaThunk.rejected, (state, action) => {
                const { status, message } = action.payload;
                if (status === 409) {
                    state.error = null;
                    state.horarioOcupadoError = message;
                }
                else {
                    state.error = message;
                }
            });

        //Cases de eliminar reserva
        builder
            .addCase(deleteReservaThunk.fulfilled, (state, action) => {
                state.error = null;
                state.successMessage = action.payload; // guardo el mensaje de eliminado con exito
            })
            .addCase(deleteReservaThunk.rejected, (state, action) => {
                state.error = action.payload;
            });

        //Cases de modificar fecha y horario reserva
        builder
            .addCase(reagendarReservaThunk.fulfilled, (state, action) => {
                state.error = null;
                state.successMessage = action.payload; // guardo el mensaje de eliminado con exito
            })
            .addCase(reagendarReservaThunk.rejected, (state, action) => {
                state.error = action.payload;
            });

        //Cases de obtener todas las reservas
        builder
            .addCase(getAllReservaThunk.pending, (state) => {
                state.loading = true;  // Empieza la carga
                state.error = null;    // Limpio error previo
            })
            .addCase(getAllReservaThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.reservas = action.payload; // Se actualiza el estado con las reservas obtenidos
            })
            .addCase(getAllReservaThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        //Cases de obtener reserva por id
        builder
            .addCase(getByIdReservaThunk.fulfilled, (state, action) => {
                state.error = null;
                state.reservaEnEdicion = action.payload;
            })
            .addCase(getByIdReservaThunk.rejected, (state, action) => {
                state.error = action.payload;
            });


        //Cases de obtener reservas por id cliente
        builder
            .addCase(getReservasByIdClienteThunk.pending, (state) => {
                state.loading = true;  // Empieza la carga
                state.error = null;    // Limpio error previo
            })
            .addCase(getReservasByIdClienteThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.reservas = action.payload; // guardo las reservas del cliente
            })
            .addCase(getReservasByIdClienteThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        //Cases de obtener reservas por filtro

        builder
            .addCase(getByFilterThunk.pending, (state) => {
                state.loading = true;  // Empieza la carga
                state.error = null;    // Limpio error previo
            })
            .addCase(getByFilterThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.reservas = action.payload; // Se actualiza el estado con las reservas obtenidas
            })
            .addCase(getByFilterThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        //Cases de obtener horarios optimos

        builder
            .addCase(getAvailableTimesThunk.pending, (state) => {
                state.loading = true;  // Empieza la carga
                state.error = null;    // Limpio error previo
            })
            .addCase(getAvailableTimesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.horarios = action.payload; // Se actualiza el estado con los horarios disponibles
            })
            .addCase(getAvailableTimesThunk.rejected, (state, action) => {
                state.loading = false;
                state.horarios = [];
                state.error = action.payload;
            });

        //Cases de obtener reservas por fecha
        builder
            .addCase(getReservasByDateThunk.pending, (state) => {
                state.loading = true;  // Empieza la carga
                state.error = null;    // Limpio error previo
            })
            .addCase(getReservasByDateThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.reservas = action.payload; // guardo las reservas
            })
            .addCase(getReservasByDateThunk.rejected, (state, action) => {
                state.loading = null;
                state.error = action.payload;
            });

        //Cases modificar estado de pago reserva
        builder
            .addCase(ModifyPaymentStatusThunk.fulfilled, (state, action) => {
                state.error = null;
                state.successMessage = action.payload;
            })
            .addCase(ModifyPaymentStatusThunk.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearSuccessMessage, clearErrorMessage, setFecha, setHorario, abrirModalReserva, cerrarModalReserva, setReservaEnEdicion,clearHorarioOcupadoError,setError } = reservasSlice.actions;
export default reservasSlice.reducer;