import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { configurarModoDePagoThunk, getModoDePagoThunk } from '../redux/thunks/pagoThunks';

export const useConfiguracionDePago = () => {
    const dispatch = useDispatch();
    const { formaDePago } = useSelector((state) => state.configDePago);

    const modificarFormaDePago = (e) => {
        e.preventDefault();
        const form = e.target;

        const formaDePago = {
            tipoDePago: +form.formaDePago.value
        }

        console.log("modo de pago que se envia",formaDePago)

        dispatch(configurarModoDePagoThunk(formaDePago));
    };

    const obtenerFormaDePago = () => {
        dispatch(getModoDePagoThunk());
    }

    return {
        modificarFormaDePago,
        formaDePago,
        obtenerFormaDePago,
    };

}
