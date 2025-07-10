import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReservaThunk, deleteReservaThunk, reagendarReservaThunk, getAllReservaThunk, getReservasByIdClienteThunk, getByFilterThunk, getReservasPaginadasThunk, getAvailableTimesThunk, getReservasByDateThunk, getByIdReservaThunk, ModifyPaymentStatusThunk } from '../redux/thunks/reservasThunks';
import { clearSuccessMessage, setFecha, setHorario, abrirModalReserva, cerrarModalReserva, clearErrorMessage, setReservaEnEdicion, clearHorarioOcupadoError } from '../redux/slices/reservasSlice';
import moment from 'moment';

export const useReservas = () => {
    const rol = 'admin';
    const dispatch = useDispatch();
    const { reservas, reservaSeleccionada, reservaEnEdicion, horarios, horarioSeleccionado, fechaSeleccionada, total, currentPage, loading, error, successMessage, modalReservaAbierto, horarioOcupadoError } = useSelector((state) => state.reservas);
    const navigate = useNavigate();

    const crearReserva = (datosCliente, idServicio) => {

        if (!datosCliente) {
            return;
        }

        const nuevaReserva = {
            fecha: fechaSeleccionada,
            clienteId: datosCliente.id ? parseInt(datosCliente.id) : null,
            servicioId: idServicio,
            horaInicio: horarioSeleccionado,
            nombreClienteNoRegistrado: (!datosCliente.id && datosCliente.nombre) ? datosCliente.nombre : null,
            apellidoClienteNoRegistrado: (!datosCliente.id && datosCliente.apellido) ? datosCliente.apellido : null,
            celularClienteNoRegistrado: (!datosCliente.id && datosCliente.celular) ? datosCliente.celular : null,
            emailClienteNoRegistrado: (!datosCliente.id && datosCliente.email) ? datosCliente.email : null,
        };
        dispatch(createReservaThunk(nuevaReserva));
    };

    const eliminarReserva = () => {
        dispatch(deleteReservaThunk(reservaEnEdicion.id));
    };

    const modificarReserva = () => {

        if (!reservaEnEdicion) return;

        const nuevaFechaYHora =
        {
            idReserva: reservaEnEdicion.id,
            fecha: fechaSeleccionada,
            horaInicio: horarioSeleccionado,
        }


        dispatch(reagendarReservaThunk(nuevaFechaYHora));
    };

    const obtenerTodasLasReservas = () => {
        dispatch(getAllReservaThunk());
    };

    const obtenerReservasPorIdCliente = (id) => {
        dispatch(getReservasByIdClienteThunk(id));
    };

    const filtrarReservas = (e) => {
        e.preventDefault();
        const form = e.target;

        const filtros = {
            nombre: form.nombre.value,
            fecha: form.fecha.value === "" ? null : moment(form.fecha.value, "DD/MM/YYYY").format('YYYY-MM-DD'),
        }

        dispatch(getByFilterThunk(filtros));
    }

    const onbtenerReservasPaginadas = (nuevaPagina = 1) => {
        dispatch(getReservasPaginadasThunk({ page: nuevaPagina, pageSize: 10 }));
    }

    const obtenerHorariosDisponibles = (fecha, duracion) => {
        const fechaFormateada = moment(fecha).format("YYYY-MM-DD");
        dispatch(setFecha(fechaFormateada));
        dispatch(getAvailableTimesThunk({ fecha: fechaFormateada, duracion: duracion }));
    }

    const obtenerReservasPorFecha = (fecha) => {
        const fechaFormateada = moment(fecha).format("YYYY-MM-DD");
        return dispatch(getReservasByDateThunk(fechaFormateada));
    }

    const obtenerReservaPorId = (id) => {

        dispatch(getByIdReservaThunk(id));

    }

    const reservarHorario = (modoReserva, horario, idServicio) => {
        dispatch(setHorario(horario));

        if (modoReserva === "crear") {
            redirectPantallaFormularioReserva(idServicio);
        }

        if (modoReserva === "modificar") {
            modificarReserva();
        }

    }


    const redirectPantallaFormularioReserva = (idServicio) => {
        if (rol === "cliente") {
            navigate(`/cliente/form-reserva/${idServicio}`);
        }

        if (rol === "admin") {
            navigate(`/admin/form-reserva/${idServicio}`);
        }

        if (rol === "publico") {
            navigate(`/form-reserva/${idServicio}`);
        }

    }


    const modificarEstadoDePago = (estadoDePago) => {
        dispatch(ModifyPaymentStatusThunk(estadoDePago));
    }

    const limpiarMensajeExito = () => {
        dispatch(clearSuccessMessage());
    };

    const limpiarMensajeError = () => {
        dispatch(clearErrorMessage());
    }

    const abrirModalInfoReserva = (reserva) => {
        dispatch(abrirModalReserva(reserva));
    }

    const cerrarModalInfoReserva = () => {
        dispatch(cerrarModalReserva());
    }

    const setReservaParaCancelar = (reserva) => {
        dispatch(setReservaEnEdicion(reserva));
    }

    const limpiarHorarioOcupadoError = () => {
        dispatch(clearHorarioOcupadoError());
    }


    return {
        reservas,
        reservaSeleccionada,
        reservaEnEdicion,
        horarios,
        horarioSeleccionado,
        fechaSeleccionada,
        total,
        currentPage,
        loading,
        error,
        successMessage,
        modalReservaAbierto,
        crearReserva,
        eliminarReserva,
        modificarReserva,
        obtenerTodasLasReservas,
        obtenerReservasPorIdCliente,
        filtrarReservas,
        onbtenerReservasPaginadas,
        obtenerHorariosDisponibles,
        obtenerReservasPorFecha,
        obtenerReservaPorId,
        reservarHorario,
        modificarEstadoDePago,
        limpiarMensajeExito,
        limpiarMensajeError,
        abrirModalInfoReserva,
        cerrarModalInfoReserva,
        setReservaParaCancelar,
        limpiarHorarioOcupadoError,
        horarioOcupadoError,
    };
};