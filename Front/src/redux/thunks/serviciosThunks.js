import { createAsyncThunk } from '@reduxjs/toolkit';
import { createServicio,deleteServicio,updateServicio,getAllServicio,getByIdServicio,getByCategory } from '../../services/serviciosService';

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


export const deleteServicioThunk = createAsyncThunk(
  'servicios/deleteServicio',
  async (idServicio, thunkAPI) => {
    try {

      const response = await deleteServicio(idServicio);
      await thunkAPI.dispatch(getAllServicioThunk());
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);

export const updateServicioThunk = createAsyncThunk(
  'servicios/updateServicio',
  async (servicioModificado, thunkAPI) => {
    try {

      const response = await updateServicio(servicioModificado);
      await thunkAPI.dispatch(getAllServicioThunk());
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);

export const getAllServicioThunk = createAsyncThunk(
  'servicios/getAll',
  async (_,thunkAPI) => {
    try {

      const response = await getAllServicio();
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);

export const getByIdServicioThunk = createAsyncThunk(
  'servicios/getById',
  async (id,thunkAPI) => {
    try {

      const response = await getByIdServicio(id);
      console.log("La peticion entro en el thunk");
      console.log(response)
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);

export const getByCategoryThunk = createAsyncThunk(
  'servicios/getByCategory',
  async (categoria,thunkAPI) => {
    try {

      const response = await getByCategory(categoria);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);