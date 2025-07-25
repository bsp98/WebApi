import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activarPagoAnticipado, activarPagoAlFinalizar } from '../redux/slices/configDePagoSlice';

export const useConfiguracionDePago = () => {
    const dispatch = useDispatch();
    const { formaDePago } = useSelector((state) => state.configDePago);

    const modificarFormaDePago = (e) => {
        e.preventDefault();
        const form = e.target;

        const formaDePago = +form.formaDePago.value

        if (formaDePago === 1) {
            dispatch(activarPagoAnticipado());
        }
        else {
            dispatch(activarPagoAlFinalizar());
        }
    };
    return {
        modificarFormaDePago,
        formaDePago
    };

}
