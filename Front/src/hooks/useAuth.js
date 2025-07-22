import { loginUserThunk, registroUserThunk, logoutThunk } from '../redux/thunks/authThunks';
import { useSelector, useDispatch } from 'react-redux';
import { clearSuccessMessage, setError, setAuthDesdeStorage, setAuthLoaded } from '../redux/slices/authSlice';
import moment from 'moment';
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const { usuario, token, error, successMessage, authLoaded } = useSelector((state) => state.auth);
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
        console.log("Credencial inyectada por google", credentialResponse)
        const token = credentialResponse.credential;
        dispatch(loginUserThunk({ tokenGoogle: token }));

    }

    const registrarUsuario = (e) => {
        e.preventDefault();

        const form = e.target;

        const passwordValidate = form.password === form.passwordRepeat;
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
                fechaDeNacimiento: form.fechaNacimiento.value,
                celular: form.celular.value,
                password: form.password.value,
                politicasAceptadas: true,
                fechaAceptacion: moment().format("YYYY-MM-DD HH:mm:ss"),
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

    const setErrorGoogle = () => {
        dispatch(setError("Error en el login de google"));
    }

    const setDatosAuthDelStorage = (usuario, token) => {
        dispatch(setAuthDesdeStorage({ usuario, token }));
    }

    const setLoadDeCargaDeDatos = (seCargaronDatos) => {
        dispatch(setAuthLoaded(seCargaronDatos));

    }


    return {
        usuario,
        token,
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
    }
}
