import { configureStore } from "@reduxjs/toolkit";
import serviciosReducer from '../slices/serviciosSlice';
import configDePagoReducer from '../slices/configDePagoSlice'
import clientesReducer from '../slices/clientesSlice'
import reservasReducer from '../slices/reservasSlice'
import authReducer from '../slices/authSlice'

export const store = configureStore({
  reducer: {
    servicios: serviciosReducer,
    configDePago: configDePagoReducer,
    clientes: clientesReducer,
    reservas: reservasReducer,
    auth: authReducer,

  },
});