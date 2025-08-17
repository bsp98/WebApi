import { createAsyncThunk } from '@reduxjs/toolkit';
import { solicitarPagoMercadoPago} from '../../services/pagoService';

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