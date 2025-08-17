import React from 'react'
import '../../page.css'
import { Title } from '../../../components/iu/texts/Title'
import { Table } from '../../../components/iu/table/Table'
import { ButtonRedirect } from '../../../components/iu/buttons/ButtonRedirect'
import { useNavigate } from 'react-router-dom'
import { useDiasLibres } from '../../../hooks/useDiasLibres';
import { useEffect } from 'react'
import { MessageError } from '../../../components/iu/messages/MessageError'
import { Spinner } from '../../../components/iu/spinner/Spinner'
import { Modal } from '../../../components/iu/messages/Modal'
import moment from 'moment';

export const GestionDiasLibres = () => {
      const { error, diasLibres, loading, eliminarDiaLibre, obtenerTodosLosDiasLibres, successMessage, limpiarMensajeExito } = useDiasLibres();
  const navigate = useNavigate();

  useEffect(() => {
    obtenerTodosLosDiasLibres();
  }, []);

  const agregarDiaLibre = () => {
    navigate('/admin/alta-dias-libres');
  }


  const columns = [
     { header: 'Fecha', render: (dato) => moment(dato.fecha).format('DD/MM/YYYY') },
  ];


  return (
    <div className='container_page'>

      <Title text={"Gestión de días libres"} />

      <Table columns={columns} datos={diasLibres}  textBtn2={"Eliminar"} actionBtn2={eliminarDiaLibre} table_width={"table_medium"} class_margin={"table_margin_default"} />

      {loading && <Spinner />}

      {error && (<MessageError error={error} />)}

      {successMessage && (
        <Modal mensaje={successMessage} alCerrar={limpiarMensajeExito} />
      )}

      <ButtonRedirect btn_variant={"btn_primary"} width_btn={"btn_small"} textBtn={"AGREGAR DÍA LIBRE"} actionRedirect={agregarDiaLibre} />

    </div>
  )
}
