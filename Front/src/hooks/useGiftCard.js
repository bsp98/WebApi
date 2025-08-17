import { useDispatch, useSelector } from 'react-redux';
import { solicitarGiftCardThunk } from '../redux/thunks/giftCardThunks';
import { setError,clearSuccessMessage, setMontoGift, clearMontoGift, habilitarOtroMonto, deshabilitarOtroMonto } from '../redux/slices/giftCardSlice';

export const useGiftCard = () => {
    const dispatch = useDispatch();
    const { montoGift, error, successMessage, seleccionarOtroMonto } = useSelector((state) => state.giftCard);


    const solicitarGiftCard = (e) => {
        e.preventDefault();
        const form = e.target;


        const monto = montoGift;

        if (monto < 790) {
            dispatch(setError("El monto seleccionado no debe ser menor a $790"))
        }
        else {
            const datosGiftCard = {
                nombreComprador: form.nombreComprador.value,
                emailComprador: form.emailComprador.value,
                celularComprador: form.celularComprador.value,
                nombreDestinatario: form.nombreDestinatario.value,
                mensaje: form.mensaje.value,
                monto: monto,
            }

            dispatch(solicitarGiftCardThunk(datosGiftCard));
        }
    }

    const guardarMontoPrestablecido = (monto) => {
        dispatch(deshabilitarOtroMonto());
        dispatch(setMontoGift(monto));
    }

    const guardarMontoPersonalizado = (monto) => {
        dispatch(setMontoGift(monto));
    }

    const limpiarMontoGift = () => {
        dispatch(clearMontoGift());
    }

    const habilitarSeleccionOtroMonto = () => {
        dispatch(habilitarOtroMonto());
    }

    const limpiarMensajeExito = () => {
        dispatch(clearSuccessMessage());
    };


    return {
        montoGift,
        error,
        successMessage,
        limpiarMontoGift,
        solicitarGiftCard,
        seleccionarOtroMonto,
        habilitarSeleccionOtroMonto,
        guardarMontoPrestablecido,
        guardarMontoPersonalizado,
        limpiarMensajeExito


    };

}