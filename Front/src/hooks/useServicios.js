import { useDispatch, useSelector } from 'react-redux';
import { createServicioThunk, deleteServicioThunk,updateServicioThunk, getAllServicioThunk, getByIdServicioThunk, getByCategoryThunk } from '../redux/thunks/serviciosThunks';
import { clearSuccessMessage } from '../redux/slices/serviciosSlice';

export const useServicios = () => {
    const dispatch = useDispatch();
    const { servicios, error, loading, successMessage, servicioSeleccionado } = useSelector((state) => state.servicios);


    const crearServicio = (e) => {
        e.preventDefault();

        const form = e.target;

        const nuevoServicio = {                                         
            nombre: form.nombre.value,
            descripcion: form.descripcion.value,
            precio: +form.precio.value,
            descuento: +form.descuento.value,
            disponibilidad: 1,
            categoria: +form.categoria.value,
            tiempoDeDuracionMin: +form.duracion.value,
        };
        dispatch(createServicioThunk(nuevoServicio));
    };

    const eliminarServicio = (servicio) => {
        dispatch(deleteServicioThunk(servicio.id));
    };

    const modificarServicio = (e) => {
        e.preventDefault();

        const form = e.target;

        const servicioModificado = {
            id: form.id.value,
            nombre: form.nombre.value,
            descripcion: form.descripcion.value,
            precio: +form.precio.value,
            descuento: +form.descuento.value,
            disponibilidad: form.disponibilidad.checked ? 1 : 0,
            categoria: +form.categoriaValue.value,
            tiempoDeDuracionMin: +form.duracion.value,
        };
        dispatch(updateServicioThunk(servicioModificado));
    };

    const obtenerTodosLosServicios = () => {
        dispatch(getAllServicioThunk())
    };

    const obtenerServicioPorId = (id) => {
        dispatch(getByIdServicioThunk(id));
    };

    const serviciosPorCategoria = (categoria) => {
        dispatch(getByCategoryThunk(categoria))
    };

    const limpiarMensajeExito = () => {
        dispatch(clearSuccessMessage());
    };




    return {
        servicios,
        servicioSeleccionado,
        loading,
        error,
        successMessage,
        crearServicio,
        eliminarServicio,
        modificarServicio,
        obtenerTodosLosServicios,
        obtenerServicioPorId,
        serviciosPorCategoria,
        limpiarMensajeExito
    };
};