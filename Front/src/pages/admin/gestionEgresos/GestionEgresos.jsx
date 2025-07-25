import React from 'react'
import '../../page.css'
import './gestionEgresos.css'
import { Title } from '../../../components/iu/texts/Title'
import { Table } from '../../../components/iu/table/Table'
import { ButtonRedirect } from '../../../components/iu/buttons/ButtonRedirect'
import { useNavigate } from 'react-router-dom'
import { useEgresos} from '../../../hooks/useEgresos';
import { useEffect } from 'react'
import { MessageError } from '../../../components/iu/messages/MessageError'
import { Spinner } from '../../../components/iu/spinner/Spinner'
import { Modal } from '../../../components/iu/messages/Modal'
import { FilterBusqueda } from '../../../components/iu/filter/FilterBusqueda'
import { Paginacion } from '../../../components/iu/paginacion/Paginacion'
import moment from 'moment'

export const GestionEgresos = () => {
  const { error, egresos, total, currentPage, loading, eliminarEgreso, successMessage, limpiarMensajeExito, filtrarEgresos, onbtenerEgresosPaginados } = useEgresos();
  const navigate = useNavigate();


  const verInformacionEgreso = () => { };

  useEffect(() => {
    onbtenerEgresosPaginados(1);
  }, []);


  const agregarEgreso = () => {
    navigate('/admin/alta-egreso');
  }


  const columns = [
    { header: 'Fecha', render: (dato) => moment(dato.fechaDeNacimiento).format('DD/MM/YYYY') },
    { header: 'Categoría', render: (dato) => dato.categoriaNombre },
    { header: 'Lugar', render: (dato) => dato.lugar },
    { header: 'Costo', render: (dato) => dato.costo },
  ];

  return (

    <div className='container_page'>

      <Title text={"Panel de egresos"} />

      <div className='container_filter_egresos'>
        <FilterBusqueda actionOnSubmit={filtrarEgresos} tipoInput1={"text"} label1={"Categoría:"}  placeHolder1={"Ingrese la categoría"} name1={"nombre"} label2={"Fecha de egreso:"} name2={"fecha"}/>
      </div>

      <Paginacion currentPage={currentPage} totalPages={Math.ceil(total / 10)} onPageChange={onbtenerEgresosPaginados} />

      <Table columns={columns} datos={egresos} textBtn1={"Ver mas"} textBtn2={"Eliminar"} actionBtn1={verInformacionEgreso} actionBtn2={eliminarEgreso} table_width={"table_medium"} class_margin={"table_margin_default"} />

      {loading && <Spinner />}

      {error && (<MessageError error={error} />)}

      {successMessage && (
        <Modal mensaje={successMessage} alCerrar={limpiarMensajeExito} />
      )}

      <ButtonRedirect btn_variant={"btn_primary"} width_btn={"btn_small"} textBtn={"AGREGAR EGRESO"} actionRedirect={agregarEgreso} />

    </div>
  )
}
