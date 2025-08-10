import { createAsyncThunk } from '@reduxjs/toolkit';
import { getByCategory,createPublicacion,deletePublicacion } from '../../services/publicacionesService';

export const createPublicacionThunk = createAsyncThunk(
    'publicaciones/crearServicio',
    async (nuevaPublicacion, thunkAPI) => {
        try {

            const response = await createPublicacion(nuevaPublicacion);
            return response;

        } catch (error) {

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
  async ({id,categoria}, thunkAPI) => {
    try {

      const response = await deletePublicacion(id);
      await thunkAPI.dispatch(getByCategoryThunk(categoria));
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);