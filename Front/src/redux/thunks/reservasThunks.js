import { createAsyncThunk } from '@reduxjs/toolkit';
import { createReserva, deleteReserva, reagendarReserva, getAllReserva, getByIdReserva, getReservasByIdCliente, getByFilter, getReservasPaginadas, getAvailableTimes, getReservasByDate, ModifyPaymentStatus } from '../../services/reservasService';
import { obtenerToken } from '../../utils/storage/authStorage';

const token = obtenerToken();

export const createReservaThunk = createAsyncThunk(
  'reservas/crearReserva',
  async (nuevaReserva, thunkAPI) => {
    try {

      const response = await createReserva(nuevaReserva);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue({
        status: error.status,
        message: error.message,
      });//pasa el error al slice

    }
  }
);

const rol = "admin"
//esto se hace con el slice de Aut  ///HAY QUE AGREGAR LOGICA DE SEGUN EL USUARIO Y LA PANTALLA A REDIRECCIONAR ES EL METODO QUE SE LLAMA
export const deleteReservaThunk = createAsyncThunk(
  'reservas/deleteReserva',
  async (idReserva, thunkAPI) => {
    try {

      const response = await deleteReserva(idReserva);

      if (rol === "cliente") {
        await thunkAPI.dispatch(getReservasByIdClienteThunk(1));
      }

      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);

export const reagendarReservaThunk = createAsyncThunk(
  'reservas/reagendarReserva',
  async (datoDeReagenda, thunkAPI) => {
    try {

      const response = await reagendarReserva(datoDeReagenda);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);

    }
  }
);


export const getAllReservaThunk = createAsyncThunk(
  'reservas/getAll',
  async (_, thunkAPI) => {
    try {

      const response = await getAllReserva();
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);

export const getByIdReservaThunk = createAsyncThunk(
  'reservas/getById',
  async (id, thunkAPI) => {
    try {

      const response = await getByIdReserva(id);

      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);

export const getReservasByIdClienteThunk = createAsyncThunk(
  'reservas/getReservasByIdCliente',
  async (id, thunkAPI) => {
    try {

      const response = await getReservasByIdCliente(id);

      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);


export const getByFilterThunk = createAsyncThunk(
  'reservas/getByFilter',
  async (filtros, thunkAPI) => {
    try {
      
      const response = await getByFilter(filtros,token);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  });


export const getReservasPaginadasThunk = createAsyncThunk(
  'reservas/getReservasPaginadas',
  async ({ page, pageSize }, thunkAPI) => {
    try {

      const response = await getReservasPaginadas(page, pageSize);
      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);


export const getAvailableTimesThunk = createAsyncThunk(
  'reservas/getAvailableTimes',
  async ({ fecha, duracion }, thunkAPI) => {
    try {

      const response = await getAvailableTimes(fecha, duracion);
      return response;

    } catch (error) {
        console.log("el error entro del el thunk getAvailable", error.message);
      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);

export const getReservasByDateThunk = createAsyncThunk(
  'reservas/getReservasByDate',
  async (fecha, thunkAPI) => {
    try {

      const response = await getReservasByDate(fecha);

      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);


export const ModifyPaymentStatusThunk = createAsyncThunk(
  'reservas/ModifyPaymentStatus',
  async (PaymentStatus, thunkAPI) => {
    try {

      const response = await ModifyPaymentStatus(PaymentStatus);

      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);//pasa el error al slice

    }
  }
);