import { createAsyncThunk } from '@reduxjs/toolkit';
import { solicitarPagoMercadoPago, configurarModoDePago, getModoDePago } from '../../services/pagoService';
import { obtenerToken } from '../../utils/storage/authStorage';
import { logoutThunk } from '../thunks/authThunks';

export const solicitarPagoMercadoPagoThunk = createAsyncThunk(
  'pago/solicitarPagoMercadoPago',
  async (datosPago, thunkAPI) => {
    try {

      const response = await solicitarPagoMercadoPago(datosPago);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);


export const configurarModoDePagoThunk = createAsyncThunk(
  'pago/configurarModoDePago',
  async (modo, thunkAPI) => {
    try {

      const token = obtenerToken();
      const response = await configurarModoDePago(modo, token);
      return response;

    } catch (error) {

      if (error.status === 401) {
        thunkAPI.dispatch(logoutThunk());
        return;
      }

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);


export const getModoDePagoThunk = createAsyncThunk(
  'pago/getModoDePago',
  async (_, thunkAPI) => {
    try {

      const response = await getModoDePago();
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);