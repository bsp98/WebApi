import { createAsyncThunk } from '@reduxjs/toolkit';
import { createDiaLibre,deleteDiaLibre,getAllDiaLibre} from '../../services/diasLibresService';

export const createDiaLibreThunk = createAsyncThunk(
  'diasLibres/createDiaLibre',
  async (nuevoDiaLibre, thunkAPI) => {
    try {

      const response = await createDiaLibre(nuevoDiaLibre);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);

export const deleteDiaLibreThunk = createAsyncThunk(
  'diasLibres/deleteDiaLibre',
  async (idDiaLibre, thunkAPI) => {
    try {

      const response = await deleteDiaLibre(idDiaLibre);
      await thunkAPI.dispatch(getAllDiaLibreThunk());
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);


export const getAllDiaLibreThunk= createAsyncThunk(
  'diasLibres/getAll',
  async (_,thunkAPI) => {
    try {

      const response = await getAllDiaLibre();
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);