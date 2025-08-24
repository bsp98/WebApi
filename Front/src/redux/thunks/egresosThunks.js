import { createAsyncThunk } from '@reduxjs/toolkit';
import { createEgreso,deleteEgreso,getEgresosPaginados,getByFilter} from '../../services/egresosService';
import { obtenerToken } from '../../utils/storage/authStorage';


export const createEgresoThunk = createAsyncThunk(
  'egresos/crearEgreso',
  async (nuevoEgreso, thunkAPI) => {
    try {

      const token = obtenerToken();
      const response  = await createEgreso(nuevoEgreso,token);
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
                const token = obtenerToken();

      const response = await deleteEgreso(idEgreso,token);
      await thunkAPI.dispatch(getEgresosPaginadosThunk({ page: 1 , pageSize: 10 }));
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
          const token = obtenerToken();

      const response = await getEgresosPaginados(page,pageSize,token);
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
      
      const token = obtenerToken();
      const response = await getByFilter(filtros,token);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  });