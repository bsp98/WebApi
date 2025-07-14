import { useDispatch, useSelector } from 'react-redux';
import { createClienteThunk, deleteClienteThunk, getAllClienteThunk, getByIdClienteThunk, getByFilterThunk, getClientesPaginadosThunk } from '../redux/thunks/clientesThunks';
import { clearSuccessMessage, setError } from '../redux/slices/clientesSlice';
import moment from 'moment';

export const useClientes = () => {
    const dispatch = useDispatch();
    const { clientes, clienteSeleccionado, total, currentPage, error, loading, successMessage } = useSelector((state) => state.clientes);


    const agregarCliente = (e) => {
        e.preventDefault();
        const form = e.target;

        if (!form.fechaDeNacimiento.value) {
            dispatch(setError("Debe seleccionar una fecha de nacimiento"))
            return;
        }

        const nuevoCliente = {
            nombre: form.nombre.value,
            apellido: form.apellido.value,
            fechaDeNacimiento: moment(form.fechaDeNacimiento.value, "DD/MM/YYYY").format('YYYY-MM-DD'),
            email: form.email.value,
            celular: form.celular.value,
            origenCreacion: "admin",
            password: "",
            activo: true
        };

        console.log(nuevoCliente)

        dispatch(createClienteThunk(nuevoCliente));
    };

    const eliminarCliente = (cliente) => {
        dispatch(deleteClienteThunk(cliente.id));
    };

    const obtenerTodosLosClientes = () => {
        dispatch(getAllClienteThunk())
    };

    const obtenerClientePorId = (id) => {
        dispatch(getByIdClienteThunk(id));
    };

    const limpiarMensajeExito = () => {
        dispatch(clearSuccessMessage());
    };

    const filtrarClientes = (e) => {
        e.preventDefault();
        const form = e.target;

        const filtros = {
            nombre: form.nombre?.value || null,
            celular: form.apellido?.value || null,
            fecha: form.fecha?.value
                ? moment(form.fecha.value, "DD/MM/YYYY").format("YYYY-MM-DD")
                : null,
        }

        dispatch(getByFilterThunk(filtros));
    }

    const onbtenerClientesPaginados = (nuevaPagina = 1) => {
        dispatch(getClientesPaginadosThunk({ page: nuevaPagina, pageSize: 10 }));
    }




    return {
        clientes,
        clienteSeleccionado,
        total,
        currentPage,
        loading,
        error,
        successMessage,
        agregarCliente,
        eliminarCliente,
        obtenerTodosLosClientes,
        obtenerClientePorId,
        limpiarMensajeExito,
        filtrarClientes,
        onbtenerClientesPaginados
    };
}