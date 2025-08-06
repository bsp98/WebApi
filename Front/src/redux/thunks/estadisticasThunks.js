import { createAsyncThunk } from '@reduxjs/toolkit';
import { getResumenEstadisticas} from '../../services/estadisticasService';

export const getResumenEstadisticasThunk  = createAsyncThunk(
  'estadisticas/getResumenEstadisticas',
  async (anio,thunkAPI) => {
    try {

      const response = await getResumenEstadisticas(anio);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);