import React from 'react'
import '../page.css'
import { usePublicaciones } from '../../hooks/usePublicaciones';
import { useRef, useEffect } from 'react';
import { FormularioAltaPublicacion } from '../../components/publicaciones/formularios/FormularioAltaPublicacion';
import { Modal } from '../../components/iu/messages/Modal';
import { Title } from '../../components/iu/texts/Title'

export const AltaPublicacion = () => {

    const { error, successMessage, crearPublicacion, limpiarMensajeExito, } = usePublicaciones();
    const formRef = useRef(null);

    useEffect(() => {
        if (successMessage) {
            formRef.current.reset();
        }
    }, [successMessage]);

    return (
        <div className='container_page'>

            <Title text={"Agregar publicación"} />

            <FormularioAltaPublicacion onSubmit={crearPublicacion} formRef={formRef} error={error} />

            {successMessage && (
                <Modal mensaje={successMessage} alCerrar={limpiarMensajeExito} />
            )}

        </div>
    )
}