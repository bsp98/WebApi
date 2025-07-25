import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registroUser, logout,loginConGoogle } from '../../services/authService';

export const loginUserThunk = createAsyncThunk(
  'auth/loginUser',
  async (datosAuth, thunkAPI) => {
    try {
      if (datosAuth.tokenGoogle) {
        // Llamar a login de Google
        const response = await loginConGoogle(datosAuth.tokenGoogle);
        return response;
      } else {
        // Login normal
        const response = await loginUser(datosAuth);
        return response;
      }
    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);

export const registroUserThunk = createAsyncThunk(
  'auth/registroUser',
  async (datos, thunkAPI) => {
    try {

      const response = await registroUser(datos);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);


export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (datosUsuario, thunkAPI) => {
    try {

      const response = await logout(datosUsuario);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);