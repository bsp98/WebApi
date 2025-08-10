import { createAsyncThunk } from '@reduxjs/toolkit';
import { updatePassword,solicitarCodigo,recuperarPassword} from '../../services/usuariosService';
import { createDraftSafeSelector } from '@reduxjs/toolkit';


export const updatePasswordThunk = createAsyncThunk(
  'usuarios/updatePassword',
  async (datosUpdate, thunkAPI) => {
    try {

      const response = await updatePassword(datosUpdate);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);

    }
  }
);

export const solicitarCodigoThunk = createAsyncThunk(
  'usuarios/solicitarCodigo',
  async (email, thunkAPI) => {
    try {

      const response = await solicitarCodigo(email);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);

    }
  }
);

export const recuperarPasswordThunk = createAsyncThunk(
  'usuarios/recuperarPassword',
  async (datos, thunkAPI) => {
    try {

      const response = await recuperarPassword(datos);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);

    }
  }
);