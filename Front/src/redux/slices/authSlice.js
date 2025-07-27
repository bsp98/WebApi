import { createSlice } from '@reduxjs/toolkit';
import { loginUserThunk, registroUserThunk, logoutThunk } from '../thunks/authThunks';
import {guardarUsuario, limpiarAuthStorage} from '../../utils/storage/authStorage';

const manejarAutenticacion = (state, payload = null) => {
   const {idUsuario, rolUsuario } = payload;
   console.log("datos del usuaruio slice",{idUsuario,rolUsuario});
    state.usuario = { idUsuario, rolUsuario };
    state.authLoaded = true;
    
    guardarUsuario({ idUsuario, rolUsuario });
};

const initialState = {
    usuario: null,
    error: null,
    successMessage: null,
    authLoaded: false,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setAuthDesdeStorage: (state, action) => {
            state.usuario = action.payload.usuario;
            state.authLoaded = true;

        },
        setAuthLoaded: (state, action) => {
            state.authLoaded = action.payload;
        }
    },
    extraReducers: (builder) => {
        //Cases login
        builder
            .addCase(loginUserThunk.fulfilled, (state, action) => {
                state.error = null;
                manejarAutenticacion(state, action.payload);
            })
            .addCase(loginUserThunk.rejected, (state, action) => {
                state.error = action.payload;
            });

        //Cases registro
        builder
            .addCase(registroUserThunk.fulfilled, (state, action) => {
                state.error = null;
                //state.clientes.push(action.payload); // Se agrega directamente al estado
                state.successMessage = action.payload;
            })
            .addCase(registroUserThunk.rejected, (state, action) => {
                console.log("entro al reject",action.payload);
                state.error = action.payload;
            });


        //Cases cerrar sesion
        builder
            .addCase(logoutThunk.fulfilled, (state) => {
                limpiarAuthStorage();
                return initialState;
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearSuccessMessage, setError, setAuthDesdeStorage,setAuthLoaded } = authSlice.actions;
export default authSlice.reducer;