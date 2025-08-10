import { loginUserThunk, registroUserThunk, logoutThunk } from '../redux/thunks/authThunks';
import { useSelector, useDispatch } from 'react-redux';
import { clearSuccessMessage, setError, setAuthDesdeStorage, setAuthLoaded } from '../redux/slices/authSlice';
import moment from 'moment';
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const { usuario,error, successMessage, authLoaded } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const login = (e) => {
        e.preventDefault();

        const form = e.target;

        const datosLogin = {
            email: form.email.value,
            password: form.password.value,
        }

        dispatch(loginUserThunk(datosLogin));

    }


    const loginGoogle = (credentialResponse) => {
        const token = credentialResponse.credential;
       dispatch(loginUserThunk({ tokenGoogle: token }));

    }

    const registrarUsuario = (e) => {
        e.preventDefault();

        const form = e.target;
        const password = form.password.value;
        const passwordRepeat = form.passwordRepeat.value;

        const passwordValidate = password === passwordRepeat;
        const aceptoTerminosYCondiciones = form.politicas.checked;

        if (!passwordValidate) {
            dispatch(setError("La contraseña y su confirmación deben ser iguales."));
        }

        if (!aceptoTerminosYCondiciones) {
            dispatch(setError("Debés aceptar nuestras políticas para continuar."));
        }

        if (passwordValidate && aceptoTerminosYCondiciones) {
            const datosRegistro = {
                nombre: form.nombre.value,
                apellido: form.apellido.value,
                email: form.email.value,
                fechaDeNacimiento: moment(form.fechaDeNacimiento.value, "DD/MM/YYYY").format('YYYY-MM-DD'),
                celular: form.celular.value,
                password: form.password.value,
                origenCreacion: "cliente",
                activo: true,
                politicasAceptadas: true,
                fechaAceptacion: moment().format("YYYY-MM-DD"), //HH:mm:ss
            }

           dispatch(registroUserThunk(datosRegistro));
        }
    }

    const cerrarSesion = async () => {
        await dispatch(logoutThunk());
        navigate("/login");
    }

    const limpiarMensajeExito = () => {
        dispatch(clearSuccessMessage());
    };

    const limpiarMensajeError = () => {
        dispatch(setError(null));
    };

    const setErrorGoogle = () => {
        dispatch(setError("Error en el login de google"));
    }

    const setDatosAuthDelStorage = (usuario) => {
        dispatch(setAuthDesdeStorage({usuario}));
    }

    const setLoadDeCargaDeDatos = (seCargaronDatos) => {
        dispatch(setAuthLoaded(seCargaronDatos));

    }


    return {
        usuario,
        error,
        successMessage,
        login,
        cerrarSesion,
        registrarUsuario,
        limpiarMensajeExito,
        loginGoogle,
        setErrorGoogle,
        setDatosAuthDelStorage,
        authLoaded,
        setLoadDeCargaDeDatos,
        limpiarMensajeError,
    }
}
