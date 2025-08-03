import { configureStore } from "@reduxjs/toolkit";
import serviciosReducer from '../slices/serviciosSlice';
import configDePagoReducer from '../slices/configDePagoSlice'
import clientesReducer from '../slices/clientesSlice'
import reservasReducer from '../slices/reservasSlice'
import authReducer from '../slices/authSlice'
import egresosReducer from '../slices/egresosSlice';
import estadisticasReducer from '../slices/estadisticasSlice'

export const store = configureStore({
  reducer: {
    servicios: serviciosReducer,
    configDePago: configDePagoReducer,
    clientes: clientesReducer,
    reservas: reservasReducer,
    auth: authReducer,
    egresos: egresosReducer,
    estadisticas: estadisticasReducer,

  },
});