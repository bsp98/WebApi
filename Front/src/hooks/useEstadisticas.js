import { getResumenEstadisticasThunk } from '../redux/thunks/estadisticasThunks';
import { useSelector, useDispatch } from 'react-redux';
import { setError } from '../redux/slices/estadisticasSlice';

export const useEstadisticas = () => {
    const { balances, serviciosEstadistica, egresos, ingresos, balance, loading, error } = useSelector((state) => state.estadisticas);
    const dispatch = useDispatch();



    const obtenerResumenEstadistico = (e) => {
        e.preventDefault();

        const form = e.target;
        const anio = form.anio.value.trim(); // string
        const añoActual = new Date().getFullYear();
        let anioFinal;

        if (anio === "") {
            anioFinal = null;
        } else if (!/^\d{4}$/.test(anio)) {
            dispatch(setError("Debe ingresar un año válido de 4 dígitos."));
            return;
        } else {
            const anioNumber = parseInt(anio, 10);
            if (anioNumber > añoActual) {
                dispatch(setError(`No hay balances futuros. El año debe ser igual o menor a ${añoActual}.`));
                return;
            }
            anioFinal = anioNumber;
        }
        dispatch(getResumenEstadisticasThunk(anioFinal));

    }


    const obtenerResumenEstadisticoActual = () => {
        dispatch(getResumenEstadisticasThunk(null));
    }

    return {
        balances,
        serviciosEstadistica,
        egresos,
        ingresos,
        balance,
        loading,
        error,
        obtenerResumenEstadistico,
        obtenerResumenEstadisticoActual,
    }
}