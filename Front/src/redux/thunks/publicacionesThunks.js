import { createAsyncThunk } from '@reduxjs/toolkit';
import { getByCategory, createPublicacion, deletePublicacion } from '../../services/publicacionesService';
import { obtenerToken } from '../../utils/storage/authStorage';
import { logoutThunk } from '../thunks/authThunks';


export const createPublicacionThunk = createAsyncThunk(
  'publicaciones/crearServicio',
  async (nuevaPublicacion, thunkAPI) => {
    try {

      const token = obtenerToken();
      const response = await createPublicacion(nuevaPublicacion, token);
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

export const getByCategoryThunk = createAsyncThunk(
  'publicaciones/getByCategory',
  async (categoria, thunkAPI) => {
    try {

      const response = await getByCategory(categoria);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);

export const deletePublicacionThunk = createAsyncThunk(
  'publicaciones/deletePublicacion',
  async ({ id, categoria }, thunkAPI) => {
    try {

      const token = obtenerToken();
      const response = await deletePublicacion(id);
      await thunkAPI.dispatch(getByCategoryThunk(categoria, token));
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