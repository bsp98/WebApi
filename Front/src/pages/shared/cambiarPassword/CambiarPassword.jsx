import './cambiarPassword.css'
import '../../page.css'
import { useRef, useEffect } from 'react';
import { Title } from '../../../components/iu/texts/Title'
import { FormularioCambiarPassword } from '../../../components/usuario/formularios/FormularioCambiarPassword'
import { Modal } from '../../../components/iu/messages/Modal';
import { useUsuarios } from '../../../hooks/useUsuarios';

export const CambiarPassword = () => {
  const { error, successMessage, cambiarContrasena, limpiarMensajeExito } = useUsuarios();
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [successMessage])

  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
    }
  }, []);

  return (
    <div className='container_page'>

      <Title text={"Configuración de contraseña"} />

      <FormularioCambiarPassword modificarContrasena={cambiarContrasena} formRef={formRef} error={error} />

      {successMessage && (
        <Modal mensaje={successMessage} alCerrar={limpiarMensajeExito} />
      )}
    </div>
  )
}
