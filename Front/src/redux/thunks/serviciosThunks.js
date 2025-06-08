import { createAsyncThunk } from '@reduxjs/toolkit';
import { createServicio,getAllServicio } from '../../services/serviciosService';

export const createServicioThunk = createAsyncThunk(
  'servicios/crearServicio',
  async (nuevoServicio, thunkAPI) => {
    try {

      const response = await createServicio(nuevoServicio);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);

export const getAllServicioThunk = createAsyncThunk(
  'servicios/getAll',
  async (thunkAPI) => {
    try {

      const response = await getAllServicio();
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);