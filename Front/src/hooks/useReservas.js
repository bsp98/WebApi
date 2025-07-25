import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReservaThunk, deleteReservaThunk, reagendarReservaThunk, getAllReservaThunk, getReservasByIdClienteThunk, getByFilterThunk, getReservasPaginadasThunk, getAvailableTimesThunk, getReservasByDateThunk, getByIdReservaThunk, ModifyPaymentStatusThunk } from '../redux/thunks/reservasThunks';
import { clearSuccessMessage, setFecha, setHorario, abrirModalReserva, cerrarModalReserva, clearErrorMessage, setReservaEnEdicion, clearHorarioOcupadoError, setError } from '../redux/slices/reservasSlice';
import moment from 'moment';
import { guardarReservaEnStorage, obtenerReservaDeStorage, limpiarReservaEnStorage } from '../utils/storage/reservaStorage';
import { useAuth } from './useAuth';

export const useReservas = () => {
    const { usuario } = useAuth();
    const rol = usuario?.rolUsuario || null;
    const dispatch = useDispatch();
    const { reservas, reservaSeleccionada, reservaEnEdicion, horarios, horarioSeleccionado, fechaSeleccionada, total, currentPage, loading, error, successMessage, modalReservaAbierto, horarioOcupadoError } = useSelector((state) => state.reservas);
    const navigate = useNavigate();

    const crearReserva = async (datosCliente, idServicio) => {

        let reservaStorage = null;

        if (!datosCliente) {
            return;
        }
        //Si se actualizo la pagina y se perdieron los estados de hora y fecha los obtengo del storage
        if (!horarioSeleccionado || !fechaSeleccionada) {
            reservaStorage = obtenerReservaDeStorage() || {};
        }

        const nuevaReserva = {
            fecha: fechaSeleccionada || reservaStorage.fecha,
            clienteId: datosCliente.id ? parseInt(datosCliente.id) : null,
            servicioId: idServicio,
            horaInicio: horarioSeleccionado || reservaStorage.hora,
            nombreCliente: (!datosCliente.id && datosCliente.nombre) ? datosCliente.nombre : null,
            apellidoCliente: (!datosCliente.id && datosCliente.apellido) ? datosCliente.apellido : null,
            emailCliente: (!datosCliente.id && datosCliente.email) ? datosCliente.email : null,
            celularCliente: (!datosCliente.id && datosCliente.celular) ? datosCliente.celular : null,
        };

        const resultado = await dispatch(createReservaThunk(nuevaReserva));

        //limpio el storage una ves la reserva se halla creado con exito.
        if (createReservaThunk.fulfilled.match(resultado)) {
            limpiarReservaEnStorage();
        }
    };

    const eliminarReserva = () => {
        dispatch(deleteReservaThunk(reservaEnEdicion.id));
    };

    const modificarReserva = async (horario) => {

        if (!reservaEnEdicion) return;

        const nuevaFechaYHora =
        {
            idReserva: reservaEnEdicion.id,
            fecha: fechaSeleccionada,
            horaInicio: horario,
        }

        console.log("nueva fecha hora que se envia de la reserva:", nuevaFechaYHora)
        return await dispatch(reagendarReservaThunk(nuevaFechaYHora)).unwrap();
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

        // Guardo fecha en storage
        guardarReservaEnStorage({
            fecha: fechaFormateada,
        });

        return dispatch(getAvailableTimesThunk({ fecha: fechaFormateada, duracion: duracion }));
    }

    const obtenerReservasPorFecha = (fecha) => {
        const fechaFormateada = moment(fecha).format("YYYY-MM-DD");
        return dispatch(getReservasByDateThunk(fechaFormateada));
    }

    const obtenerReservaPorId = (id) => {

        dispatch(getByIdReservaThunk(id));

    }

    const reservarHorario = async (modoReserva, horario, idServicio) => {
        dispatch(setHorario(horario));

        // Guardo horario en storage
        guardarReservaEnStorage({
            hora: horario,
        });


        if (modoReserva === "crear") {
            redirectPantallaFormularioReserva(idServicio);
        }

        if (modoReserva === "modificar") {
            return await modificarReserva(horario);
        }

    }


    const redirectPantallaFormularioReserva = (idServicio) => {
        if (rol === "cliente") {
            navigate(`/cliente/form-reserva/${idServicio}`);
        }
        else if (rol === "admin") {
            navigate(`/admin/form-reserva/${idServicio}`);
        }
        else {
            navigate(`/form-reserva/${idServicio}`);
        }
    };


    const modificarEstadoDePago = (idReserva, estadoDePago) => {

        if (isNaN(estadoDePago)) {
            dispatch(setError("Debe seleccionar un estado de pago"));
        }
        else {
            dispatch(ModifyPaymentStatusThunk({ idReserva, estadoDePago }));
        }
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