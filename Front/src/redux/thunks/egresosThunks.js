import { createAsyncThunk } from '@reduxjs/toolkit';
import { createEgreso,deleteEgreso,getEgresosPaginados,getByCategory } from '../../services/egresosService';

export const createEgresoThunk = createAsyncThunk(
  'egresos/crearEgreso',
  async (nuevoEgreso, thunkAPI) => {
    try {

      const response = await createEgreso(nuevoEgreso);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);


export const deleteEgresoThunk = createAsyncThunk(
  'egresos/deleteEgreso',
  async (idEgreso, thunkAPI) => {
    try {

      const response = await deleteEgreso(idEgreso);
      await thunkAPI.dispatch(getAllEgresosThunk());
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);

  export const getEgresosPaginadosThunk = createAsyncThunk(
  'egresos/getEgresosPaginados',
  async ({ page, pageSize },thunkAPI) => {
    try {

      const response = await getEgresosPaginados(page,pageSize);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);

export const getByCategoryThunk = createAsyncThunk(
  'egresos/getByCategory',
  async (categoria,thunkAPI) => {
    try {

      const response = await getByCategory(categoria);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);


export const getByFilterThunk = createAsyncThunk(
  'egresos/getByFilter',
  async (filtros,thunkAPI) => {
    try {

      const response = await getByFilter(filtros);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  });