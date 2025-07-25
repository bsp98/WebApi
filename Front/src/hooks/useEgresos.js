import { useDispatch, useSelector } from 'react-redux';
import { createEgresoThunk, deleteEgresoThunk, getEgresosPaginadosThunk, getByFilterThunk } from '../redux/thunks/egresosThunks';
import { clearSuccessMessage } from '../redux/slices/egresosSlice';
import moment from 'moment';

export const useEgresos = () => {
    const dispatch = useDispatch();
    const { egresos, error, loading, successMessage } = useSelector((state) => state.egresos);


    const crearEgreso = (e) => {
        e.preventDefault();

        const form = e.target;

        const nuevoEgreso = {
            fechaDeCompra: moment(form.fechaDeCompra.value, "DD/MM/YYYY").format('YYYY-MM-DD'),
            categoria: +form.categoria.value,
            lugar: form.lugar.value,
            costo: +form.costo.value,
            descripcion: form.descripcion.value,
        };

        dispatch(createEgresoThunk(nuevoEgreso));
    };

    ///////////////////
    const filtrarEgresos = (e) => {
        e.preventDefault();
        const form = e.target;

        const filtros = {
            categoria: form.categoria?.value || null,
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
    //////////////////////////////
    const abrirModalInfoEgreso = (egreso) => {
        dispatch(abrirModalEgreso(reserva));
    }




    return {
        egresos,
        loading,
        error,
        successMessage,
        crearEgreso,
        eliminarEgreso,
        limpiarMensajeExito,
        filtrarEgresos,
        onbtenerEgresosPaginados,
    };
};