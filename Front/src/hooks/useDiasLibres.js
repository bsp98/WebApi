import { useDispatch, useSelector } from 'react-redux';
import { createDiaLibreThunk, deleteDiaLibreThunk, getAllDiaLibreThunk } from '../redux/thunks/diasLibresThunks';
import { clearSuccessMessage } from '../redux/slices/diasLibresSlice';
import moment from 'moment';

export const useDiasLibres = () => {
    const dispatch = useDispatch();
    const { diasLibres, error, loading, successMessage } = useSelector((state) => state.diasLibres);


    const agregarDiaLibre = (e) => {
        e.preventDefault();

        const form = e.target;
        const fecha = form.fecha.value;

        const fechaFormateada = moment(fecha, "DD/MM/YYYY").format("YYYY-MM-DD");

        const nuevoDiaNoLaborable = {                                         
            fecha: fechaFormateada,
        };
        dispatch(createDiaLibreThunk(nuevoDiaNoLaborable));
    };

    const eliminarDiaLibre = (diaLibre) => {
        dispatch(deleteDiaLibreThunk(diaLibre.id));
    };


    const obtenerTodosLosDiasLibres = () => {
        dispatch(getAllDiaLibreThunk());
    };

    const limpiarMensajeExito = () => {
        dispatch(clearSuccessMessage());
    };




    return {
        diasLibres,
        loading,
        error,
        successMessage,
        agregarDiaLibre,
        eliminarDiaLibre,
        obtenerTodosLosDiasLibres,
        limpiarMensajeExito,
    };
};