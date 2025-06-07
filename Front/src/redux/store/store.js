import { configureStore } from "@reduxjs/toolkit";
import serviciosReducer from '../slices/serviciosSlice';

export const store = configureStore({
  reducer: {
    servicios: serviciosReducer,

  },
});