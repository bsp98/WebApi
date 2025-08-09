import './olvidoPassword.css'
import '../../page.css'
import { useRef, useEffect } from 'react';
import { Title } from '../../../components/iu/texts/Title'
import { FormularioSolicitudCodigoPassword } from '../../../components/usuario/formularios/FormularioSolicitudCodigoPassword'
import { FormularioOlvidoPassword } from '../../../components/usuario/formularios/FormularioOlvidoPassword'
import { Modal } from '../../../components/iu/messages/Modal';
import { useUsuarios } from '../../../hooks/useUsuarios';
import { useNavigate } from 'react-router-dom'

export const OlvidoPassword = () => {
    const { solicitarCodigo, recuperarContrasena, limpiarMensajeResetPassword,
        limpiarMensajeCodigoEnviado, codeSent, codeSentError, codeSentSuccessMessage, passwordResetError, passwordResetSuccessMessage,limpiarEstadosOlvideContrasena } = useUsuarios();
    const formRefCodeSent = useRef(null);
    const formRefPasswordRest = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (formRefCodeSent.current) {
            formRefCodeSent.current.reset();
        }

        if (formRefPasswordRest.current) {
            formRefPasswordRest.current.reset();
        }
    }, [codeSentSuccessMessage, passwordResetSuccessMessage])

    useEffect(() => {
        if (formRefCodeSent.current) {
            formRefCodeSent.current.reset();
        }

        if (formRefPasswordRest.current) {
            formRefPasswordRest.current.reset();
        }
console.log("entro al useffect que limpia los estados y formularios")
        limpiarEstadosOlvideContrasena();
    }, []);

    const redirectLogin = () => {
        console.log("entro a redirect login");
        limpiarMensajeResetPassword();
        navigate('/login');
    }

    return (
        <div className='container_page'>

            <Title text={"Recuperación de contraseña"} />

            {
                codeSent ? <FormularioOlvidoPassword onSubmit={recuperarContrasena} formRef={formRefPasswordRest} error={passwordResetError} />
                    : <FormularioSolicitudCodigoPassword onSubmit={solicitarCodigo} formRef={formRefCodeSent} error={codeSentError} />
            }

            {codeSentSuccessMessage && (
                <Modal mensaje={codeSentSuccessMessage} alCerrar={limpiarMensajeCodigoEnviado} />
            )}

            {passwordResetSuccessMessage && (
                <Modal mensaje={passwordResetSuccessMessage} alCerrar={redirectLogin} />
            )}
        </div>
    )
}
