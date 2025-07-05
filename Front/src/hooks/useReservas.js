import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReservaThunk, deleteReservaThunk, reagendarReservaThunk, getAllReservaThunk, getReservasByIdClienteThunk, getByFilterThunk, getReservasPaginadasThunk, getAvailableTimesThunk, getReservasByDateThunk,getByIdReservaThunk,ModifyPaymentStatusThunk } from '../redux/thunks/reservasThunks';
import { clearSuccessMessage, setFecha, setHorario, abrirModalReserva, cerrarModalReserva,clearErrorMessage,setReservaEnEdicion} from '../redux/slices/reservasSlice';
import moment from 'moment';

export const useReservas = () => {
    const rol = 'cliente';
    const dispatch = useDispatch();
    const { reservas, reservaSeleccionada, reservaEnEdicion, horarios, horarioSeleccionado, fechaSeleccionada, total, currentPage, loading, error, successMessage, modalReservaAbierto } = useSelector((state) => state.reservas);
    const navigate = useNavigate();

    const crearReserva = (e) => {
        e.preventDefault();

        const form = e.target;

        const nuevaReserva = {
            nombre: form.nombre.value,
            descripcion: form.descripcion.value,
            precio: +form.precio.value,
            descuento: +form.descuento.value,
            disponibilidad: 1,
            categoria: +form.categoria.value,
            tiempoDeDuracionMin: +form.duracion.value,
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

    const reservarHorario = (modoReserva, horario) => {
        dispatch(setHorario(horario));

        if (modoReserva === "crear") {
            redirectPantallaFormularioReserva();
        }

        if (modoReserva === "modificar") {
            modificarReserva();
        }

    }


    const redirectPantallaFormularioReserva = () => {
        if (rol === "cliente") {
            navigate('/cliente/form-reserva');
        }
        else {
            navigate('/admin/form-reserva');
        }
    }


    const modificarEstadoDePago = (estadoDePago) => {
        dispatch(ModifyPaymentStatusThunk(estadoDePago));
    }

    const limpiarMensajeExito = () => {
        dispatch(clearSuccessMessage());
    };

    const limpiarMensajeError = () =>{
        dispatch(clearErrorMessage());
    }

    const abrirModalInfoReserva = (reserva) => {
        dispatch(abrirModalReserva(reserva));
    }

    const cerrarModalInfoReserva = () => {
        dispatch(cerrarModalReserva());
    }

    const setReservaParaCancelar = (reserva) =>{
        dispatch(setReservaEnEdicion(reserva));
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
    };
};