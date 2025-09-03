import { useDispatch, useSelector } from 'react-redux';
import { getByCategoryThunk, createPublicacionThunk, deletePublicacionThunk } from '../redux/thunks/publicacionesThunks';
import { clearSuccessMessage, setError } from '../redux/slices/publicacionesSlice';

export const usePublicaciones = () => {
    const dispatch = useDispatch();
    const { publicaciones, error, loading, successMessage } = useSelector((state) => state.publicaciones);

    const validarImagen = (form) => {
        let esValida = true;
        const file = form.imagen.files[0];


        //Se valida que tena una imagen
        if (!form.imagen.files.length) {
            dispatch(setError("Debes seleccionar una imagen"));
            return false;
        }
        //Se valida que sea de tipo mime
        if (!file.type.startsWith("image/")) {
            dispatch(setError("El archivo debe ser una imagen"));
            return false;
        }

        //Se valida el tamño maximo 2MB
        const maxSize = 2 * 1024 * 1024; // 2 MB
        if (file.size > maxSize) {
            dispatch(setError("La imagen no puede superar los 2 MB"));
            return false;
        }

        //Se valida extensiones validas
        const extensionesPermitidas = ["jpg", "jpeg", "png", "gif"];
        const ext = file.name.split(".").pop().toLowerCase();
        if (!extensionesPermitidas.includes(ext)) {
            dispatch(setError("Formato de imagen no permitido"));
            return false;
        }

        return esValida;
    }

    const crearPublicacion = (e) => {
        e.preventDefault();

        const form = e.target;

        const imagenValida = validarImagen(form);

        if (imagenValida) {
            const nuevaPublicacion = {
                titulo: form.titulo.value,
                categoria: +form.categoria.value,
                descripcion: form.descripcion.value,
                imagen: form.imagen.files[0],
            };
            dispatch(createPublicacionThunk(nuevaPublicacion));

        }
    };

    const publicacionPorCategoria = (categoria) => {

        dispatch(getByCategoryThunk(categoria));
    };

    const eliminarPublicacion = (datosPublicacion) => {
        // const id = idPublicacion ? parseInt(idPublicacion) : null;
        dispatch(deletePublicacionThunk(datosPublicacion));
    };

    const limpiarMensajeExito = () => {
        dispatch(clearSuccessMessage());
    };

    const limpiarMensajeError = () => {
        dispatch(setError(null));
    }




    return {
        publicaciones,
        loading,
        error,
        successMessage,
        crearPublicacion,
        publicacionPorCategoria,
        limpiarMensajeExito,
        eliminarPublicacion,
        limpiarMensajeError,
    };
};