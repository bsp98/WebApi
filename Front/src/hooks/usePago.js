import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { solicitarPagoMercadoPagoThunk } from '../redux/thunks/pagoThunks';
import { } from '../redux/slices/pagoSlice';

export const usePago = () => {
    const dispatch = useDispatch();
    const { urlMercadoPago } = useSelector((state) => state.pago);
    const { servicioSeleccionado} = useSelector((state) => state.servicios);
    const navigate = useNavigate();


    const calcularMonto = (porcentaje) => {
        const precio = servicioSeleccionado.precio;
        const monto = (precio * porcentaje) / 100;
        return monto;
    }

    const solicitarPago = (e) => {
        e.preventDefault();
        const form = e.target;
        const porsentaje = +form.porcentaje.value;
        const titulo = porsentaje === 30 ? "parcial" : "total";

        const monto = calcularMonto(porsentaje);

        const datosDePago = {
            titulo: titulo,
            monto: monto,
        }

        dispatch(solicitarPagoMercadoPagoThunk(datosDePago));
    }

    return {
        urlMercadoPago,
        solicitarPago,

    };

}