import { createAsyncThunk } from '@reduxjs/toolkit';
import { enviarMensajeContacto} from '../../services/notificacionService';

export const enviarMensajeContactoThunk = createAsyncThunk(
  'notificacion/enviarMensajeContacto',
  async (mensaje, thunkAPI) => {
    try {

      const response = await enviarMensajeContacto(mensaje);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);