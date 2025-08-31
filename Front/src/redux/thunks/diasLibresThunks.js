import { createAsyncThunk } from '@reduxjs/toolkit';
import { createDiaLibre, deleteDiaLibre, getAllDiaLibre } from '../../services/diasLibresService';
import { obtenerToken } from '../../utils/storage/authStorage';
import { logoutThunk } from '../thunks/authThunks';

export const createDiaLibreThunk = createAsyncThunk(
  'diasLibres/createDiaLibre',
  async (nuevoDiaLibre, thunkAPI) => {
    try {
      const token = obtenerToken();
      const response = await createDiaLibre(nuevoDiaLibre, token);
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

export const deleteDiaLibreThunk = createAsyncThunk(
  'diasLibres/deleteDiaLibre',
  async (idDiaLibre, thunkAPI) => {
    try {
      const token = obtenerToken();
      const response = await deleteDiaLibre(idDiaLibre, token);
      await thunkAPI.dispatch(getAllDiaLibreThunk());
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


export const getAllDiaLibreThunk = createAsyncThunk(
  'diasLibres/getAll',
  async (_, thunkAPI) => {
    try {
      const token = obtenerToken();
      const response = await getAllDiaLibre(token);
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