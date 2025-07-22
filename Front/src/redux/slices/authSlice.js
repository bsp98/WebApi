import { createSlice } from '@reduxjs/toolkit';
import { loginUserThunk, registroUserThunk, logoutThunk } from '../thunks/authThunks';
import { guardarToken, guardarUsuario, limpiarAuthStorage} from '../../utils/storage/authStorage';

const manejarAutenticacion = (state, payload) => {
    const { accesoToken, idUsuario, rolUsuario } = payload;
    state.usuario = { idUsuario, rolUsuario };
    state.token = accesoToken;
    state.authLoaded = true;

    guardarUsuario({ idUsuario, rolUsuario });
    guardarToken(accesoToken);
};

const initialState = {
    usuario: null,
    token: null,
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
            state.token = action.payload.token;
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
                manejarAutenticacion(state, action.payload);
            })
            .addCase(registroUserThunk.rejected, (state, action) => {
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