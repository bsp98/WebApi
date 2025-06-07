import { useDispatch, useSelector } from 'react-redux';
import { createServicioThunk } from '../redux/thunks/serviciosThunks';
import { clearSuccessMessage } from '../redux/slices/serviciosSlice';

export const useServicios = () => {
    const dispatch = useDispatch();
    const { servicios, error, loading, successMessage } = useSelector((state) => state.servicios);
 

    const crearServicio = (e) => {
        e.preventDefault();

        const form = e.target;
        console.log(form);

        const nuevoServicio = {
            nombre: form.nombre.value,
            categoria: +form.categoria.value,
            precio: +form.precio.value,
            descuento: +form.descuento.value,
            disponibilidad: true,
            tiempoDeDuracionMin: +form.duracion.value,
            descripcion: form.descripcion.value,
        };
        console.log(nuevoServicio);
        dispatch(createServicioThunk(nuevoServicio));
    };

    const limpiarMensajeExito = () => {
        dispatch(clearSuccessMessage());
    };

    return {
        servicios,
        loading,
        error,
        successMessage,
        crearServicio,
        limpiarMensajeExito,
    };
};