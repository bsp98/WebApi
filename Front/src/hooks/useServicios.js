import { useDispatch, useSelector } from 'react-redux';
import { createServicioThunk,getAllServicioThunk } from '../redux/thunks/serviciosThunks';
import { clearSuccessMessage } from '../redux/slices/serviciosSlice';

export const useServicios = () => {
    const dispatch = useDispatch();
    const { servicios, error, loading, successMessage } = useSelector((state) => state.servicios);
 

    const crearServicio = (e) => {
        e.preventDefault();

        const form = e.target;

        const nuevoServicio = {
            nombre: form.nombre.value,
            categoria: +form.categoria.value,
            precio: +form.precio.value,
            descuento: +form.descuento.value,
            disponibilidad:1,
            tiempoDeDuracionMin: +form.duracion.value,
            descripcion: form.descripcion.value,
        };
        dispatch(createServicioThunk(nuevoServicio));
    };

    const limpiarMensajeExito = () => {
        dispatch(clearSuccessMessage());
    };


    const obtenerTodosLosServicios = () =>{
        dispatch(getAllServicioThunk())
    } 

    return {
        servicios,
        loading,
        error,
        successMessage,
        crearServicio,
        limpiarMensajeExito,
        obtenerTodosLosServicios,
    };
};