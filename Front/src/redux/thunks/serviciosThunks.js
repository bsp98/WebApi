import { createAsyncThunk } from '@reduxjs/toolkit';
import { createServicio } from '../../services/serviciosService';

export const createServicioThunk = createAsyncThunk(
  'servicios/crearServicio',
  async (nuevoServicio, thunkAPI) => {
    try {

      const response = await createServicio(nuevoServicio);
      return response;

    } catch (error) {
      console.log("el error entro el en catch del thunk");

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);