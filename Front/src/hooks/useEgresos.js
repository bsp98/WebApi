import { useDispatch, useSelector } from 'react-redux';
import { createEgresoThunk, deleteEgresoThunk, getEgresosPaginadosThunk, getByFilterThunk } from '../redux/thunks/egresosThunks';
import { clearSuccessMessage,abrirModalEgreso,cerrarModalEgreso } from '../redux/slices/egresosSlice';
import moment from 'moment';

export const useEgresos = () => {
    const dispatch = useDispatch();
    const { egresoSeleccionado,egresos, error, loading, successMessage,modalEgresoAbierto,currentPage,total} = useSelector((state) => state.egresos);


    const crearEgreso = (e) => {
        e.preventDefault();

        const form = e.target;

        const nuevoEgreso = {
            fecha: moment(form.fechaDeCompra.value, "DD/MM/YYYY").format('YYYY-MM-DD'),
            categoriaEgreso: form.categoria.value ? +form.categoria.value : null,
            monto: +form.costo.value,
            lugar: form.lugar.value,
            descripcion: form.descripcion.value,
        };
        dispatch(createEgresoThunk(nuevoEgreso));
    };


    const filtrarEgresos = (e) => {
        e.preventDefault();
        const form = e.target;

        const filtros = {
            categoria: form.categoria.value ? +form.categoria.value : null,
            fecha: form.fecha?.value
                ? moment(form.fecha.value, "DD/MM/YYYY").format("YYYY-MM-DD")
                : null,
        }

        dispatch(getByFilterThunk(filtros));
    };

    const eliminarEgreso = (egreso) => {
        dispatch(deleteEgresoThunk(egreso.id));
    };

    const onbtenerEgresosPaginados = (nuevaPagina = 1) => {
        dispatch(getEgresosPaginadosThunk({ page: nuevaPagina, pageSize: 10 }));
    }


    const limpiarMensajeExito = () => {
        dispatch(clearSuccessMessage());
    };

    const abrirModalInfoEgreso = (reserva) => {
        dispatch(abrirModalEgreso(reserva));
    }

    const cerrarModalInfoEgreso = () => {
        dispatch(cerrarModalEgreso());
    }




    return {
        egresos,
        egresoSeleccionado,
        loading,
        error,
        successMessage,
        modalEgresoAbierto,
        crearEgreso,
        eliminarEgreso,
        limpiarMensajeExito,
        filtrarEgresos,
        onbtenerEgresosPaginados,
        abrirModalInfoEgreso,
        cerrarModalInfoEgreso,
        currentPage,
        total
    };
};