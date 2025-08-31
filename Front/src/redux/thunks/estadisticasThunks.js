import { createAsyncThunk } from '@reduxjs/toolkit';
import { getResumenEstadisticas } from '../../services/estadisticasService';
import { obtenerToken } from '../../utils/storage/authStorage';
import { logoutThunk } from '../thunks/authThunks';

export const getResumenEstadisticasThunk = createAsyncThunk(
  'estadisticas/getResumenEstadisticas',
  async (anio, thunkAPI) => {
    try {
      const token = obtenerToken();
      const response = await getResumenEstadisticas(anio, token);
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