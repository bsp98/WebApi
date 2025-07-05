import { createAsyncThunk } from '@reduxjs/toolkit';
import { createCliente,deleteCliente,getAllCliente,getByFilter,getClientesPaginados} from '../../services/clientesService';

export const createClienteThunk = createAsyncThunk(
  'clientes/crearCliente',
  async (nuevoCliente, thunkAPI) => {
    try {

      const response = await createCliente(nuevoCliente);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);

//////////FIJARSE SI AL ELIMINAR EL CLIENTE FUNCIONA PORQUE TENDRIA QUE TRAER LOS PAGINADOS
export const deleteClienteThunk = createAsyncThunk(
  'clientes/deleteCliente',
  async (idCliente, thunkAPI) => {
    try {

      const response = await deleteCliente(idCliente);
      await thunkAPI.dispatch(getAllClienteThunk());
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);


export const getAllClienteThunk = createAsyncThunk(
  'clientes/getAll',
  async (_,thunkAPI) => {
    try {

      const response = await getAllCliente();
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);

export const getByFilterThunk = createAsyncThunk(
  'clientes/getByFilter',
  async (filtros,thunkAPI) => {
    try {

      const response = await getByFilter(filtros);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  });


  export const getClientesPaginadosThunk = createAsyncThunk(
  'clientes/getClientesPaginados',
  async ({ page, pageSize },thunkAPI) => {
    try {

      const response = await getClientesPaginados(page,pageSize);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);
