import { createAsyncThunk } from '@reduxjs/toolkit';
import { createCliente, deleteCliente, getAllCliente, getByIdCliente, getByFilter, getClientesPaginados } from '../../services/clientesService';
import { obtenerToken } from '../../utils/storage/authStorage';
import { logoutThunk } from '../thunks/authThunks';


export const createClienteThunk = createAsyncThunk(
  'clientes/crearCliente',
  async (nuevoCliente, thunkAPI) => {
    try {
      const token = obtenerToken();
      const response = await createCliente(nuevoCliente, token);
      console.log(response);
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

//////////FIJARSE SI AL ELIMINAR EL CLIENTE FUNCIONA PORQUE TENDRIA QUE TRAER LOS PAGINADOS
export const deleteClienteThunk = createAsyncThunk(
  'clientes/deleteCliente',
  async (idCliente, thunkAPI) => {
    try {
      const token = obtenerToken();
      const response = await deleteCliente(idCliente, token);
      await thunkAPI.dispatch(getAllClienteThunk());
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


export const getAllClienteThunk = createAsyncThunk(
  'clientes/getAll',
  async (_, thunkAPI) => {
    try {
      const token = obtenerToken();

      const response = await getAllCliente(token);
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

export const getByIdClienteThunk = createAsyncThunk(
  'clientes/getById',
  async (id, thunkAPI) => {
    try {
      const token = obtenerToken();

      const response = await getByIdCliente(id, token);

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

export const getByFilterThunk = createAsyncThunk(
  'clientes/getByFilter',
  async (filtros, thunkAPI) => {
    try {
      const token = obtenerToken();
      const response = await getByFilter(filtros, token);
      return response;

    } catch (error) {

      if (error.status === 401) {
        thunkAPI.dispatch(logoutThunk());
        return;
      }

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  });


export const getClientesPaginadosThunk = createAsyncThunk(
  'clientes/getClientesPaginados',
  async ({ page, pageSize }, thunkAPI) => {
    try {
      const token = obtenerToken();
      const response = await getClientesPaginados(page, pageSize, token);
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
