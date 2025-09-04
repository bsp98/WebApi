import '../../page.css'
import './configurarDatosPersonales.css'
import { useUsuarios } from '../../../hooks/useUsuarios';
import { FormularioDatosPersonales } from '../../../components/usuario/formularios/FormularioDatosPersonales';
import { Modal } from '../../../components/iu/messages/Modal';
import { useRef, useEffect } from 'react';
import { Title } from '../../../components/iu/texts/Title'

export const ConfigDatosPersonales = () => {
  const { error, successMessage, cambiarDatosPersonales, limpiarMensajeExito } = useUsuarios();

  const formRef = useRef(null);
//FALTARIA PRECARGAR DATOS
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

      <Title text={"Configuración de datos personales"} />

      <FormularioDatosPersonales onSubmit={cambiarDatosPersonales} formRef={formRef} error={error} />

      {successMessage && (
        
        <Modal mensaje={successMessage} alCerrar={limpiarMensajeExito} />
      )}
    </div>
  )
}
