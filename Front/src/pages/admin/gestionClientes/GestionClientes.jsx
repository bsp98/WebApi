import React from 'react'
import '../../page.css'
import './gestionClientes.css'
import { Title } from '../../../components/iu/texts/Title'
import { Table } from '../../../components/iu/table/Table'
import { ButtonRedirect } from '../../../components/iu/buttons/ButtonRedirect'
import { useNavigate } from 'react-router-dom'
import { useClientes } from '../../../hooks/useClientes';
import { useEffect } from 'react'
import { MessageError } from '../../../components/iu/messages/MessageError'
import { Spinner } from '../../../components/iu/spinner/Spinner'
import { Modal } from '../../../components/iu/messages/Modal'
import { FilterBusqueda } from '../../../components/iu/filter/FilterBusqueda'
import { Paginacion } from '../../../components/iu/paginacion/Paginacion'
import moment from 'moment'

export const GestionClientes = () => {
  const { error, clientes, total, currentPage, loading, eliminarCliente, successMessage, limpiarMensajeExito, filtrarClientes, onbtenerClientesPaginados } = useClientes();
  const navigate = useNavigate();



  useEffect(() => {
    onbtenerClientesPaginados(1);
  }, []);


  const agregarCliente = () => {
    navigate('/admin/alta-cliente');
  }


  const columns = [
    { header: 'Nombre', render: (dato) => dato.nombre },
    { header: 'Apellido', render: (dato) => dato.apellido },
    { header: 'F. Nacimiento', render: (dato) => moment(dato.fechaDeNacimiento).format('DD/MM/YYYY') },
    { header: 'Email', render: (dato) => dato.email },
    { header: 'Celular', render: (dato) => dato.celular }
  ];

  return (

    <div className='container_page'>

      <Title text={"Panel de clientes"} />

      <div className='container_filter_clientes'>
        <FilterBusqueda actionOnSubmit={filtrarClientes} tipoInput1={"text"} label1={"Nombre cliente:"} label2={"Fecha de nacimiento:"} placeHolder1={"Ingrese el nombre del cliente"} name1={"nombre"} name2={"fecha"} />
      </div>

      <Paginacion currentPage={currentPage} totalPages={Math.ceil(total / 10)} onPageChange={onbtenerClientesPaginados} />

      <Table columns={columns} datos={clientes} textBtn2={"Eliminar"} actionBtn2={eliminarCliente} table_width={"table_medium"} class_margin={"table_margin_default"} />

      {loading && <Spinner />}

      {error && (<MessageError error={error} />)}

      {successMessage && (
        <Modal mensaje={successMessage} alCerrar={limpiarMensajeExito} />
      )}

      <ButtonRedirect btn_variant={"btn_primary"} width_btn={"btn_small"} textBtn={"AGREGAR CLIENTE"} actionRedirect={agregarCliente} />

    </div>
  )
}
