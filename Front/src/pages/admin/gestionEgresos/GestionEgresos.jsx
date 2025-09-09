import React from 'react'
import '../../page.css'
import './gestionEgresos.css'
import { Title } from '../../../components/iu/texts/Title'
import { Table } from '../../../components/iu/table/Table'
import { ButtonRedirect } from '../../../components/iu/buttons/ButtonRedirect'
import { useNavigate } from 'react-router-dom'
import { useEgresos } from '../../../hooks/useEgresos';
import { useEffect } from 'react'
import { MessageError } from '../../../components/iu/messages/MessageError'
import { Spinner } from '../../../components/iu/spinner/Spinner'
import { Modal } from '../../../components/iu/messages/Modal'
import { Paginacion } from '../../../components/iu/paginacion/Paginacion'
import { ModalInfoEgreso } from '../../../components/egresos/modal/ModalInfoEgreso'
import { FilterBusquedaSelect } from '../../../components/iu/filter/FilterBusquedaSelect'
import moment from 'moment'

export const GestionEgresos = () => {
  const { error, egresos, egresoSeleccionado, total, currentPage, loading, modalEgresoAbierto, eliminarEgreso, successMessage, limpiarMensajeExito, filtrarEgresos, onbtenerEgresosPaginados, cerrarModalInfoEgreso, abrirModalInfoEgreso } = useEgresos();
  const navigate = useNavigate();



  useEffect(() => {
    onbtenerEgresosPaginados(1);
  }, []);


  const agregarEgreso = () => {
    navigate('/admin/alta-egreso');
  }


  const columns = [
    { header: 'Fecha', render: (dato) => moment(dato.fecha).format('DD/MM/YYYY') },
    { header: 'Categoría', render: (dato) => dato.nombreCategoria },
    { header: 'Lugar', render: (dato) => dato.lugar },
    { header: 'Costo', render: (dato) => dato.monto },
  ];

  const optionsSelect = [
    { name: "Esmaltes", value: 1 },
    { name: "Insumos", value: 2 },
    { name: "Herramientas", value: 3 },
    { name: "Decoracion", value: 4 },
    { name: "Gastos comunes", value: 5 }
  ];

  return (

    <div className='container_page'>

      <Title text={"Panel de egresos"} />

      <div className='container_filter_egresos'>
        <FilterBusquedaSelect actionOnSubmit={filtrarEgresos} label1={"Categoría:"} label2={"Fecha de egreso:"} name1={"categoria"} name2={"fecha"} options={optionsSelect} defaultValueSelect={"Seleccione una categoría"} />
      </div>

      <Paginacion currentPage={currentPage} totalPages={Math.ceil(total / 10)} onPageChange={onbtenerEgresosPaginados} />

      <Table columns={columns} datos={egresos} textBtn1={"Ver mas"} textBtn2={"Eliminar"} actionBtn1={abrirModalInfoEgreso} actionBtn2={eliminarEgreso} table_width={"table_medium"} class_margin={"table_margin_default"} />

      {loading && <Spinner />}

      {error && (<MessageError error={error} />)}

      {successMessage && (
        <Modal mensaje={successMessage} alCerrar={limpiarMensajeExito} />
      )}

      <ButtonRedirect btn_variant={"btn_primary"} width_btn={"btn_small"} textBtn={"AGREGAR EGRESO"} actionRedirect={agregarEgreso} />

      {modalEgresoAbierto && <ModalInfoEgreso egreso={egresoSeleccionado} alCerrar={cerrarModalInfoEgreso} />}

    </div>
  )
}
