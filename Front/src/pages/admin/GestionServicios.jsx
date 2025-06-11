import React from 'react'
import '../page.css'
import '../../components/iu/buttons/buttons.css'
import { Title } from '../../components/iu/texts/Title'
import { Table } from '../../components/iu/table/Table'
import { ButtonRedirect } from '../../components/iu/buttons/ButtonRedirect'
import { useNavigate } from 'react-router-dom'
import { useServicios } from '../../hooks/useServicios';
import { useEffect } from 'react'
import { MessageError } from '../../components/iu/messages/MessageError'
import { Spinner } from '../../components/iu/spinner/Spinner'
import { Modal } from '../../components/iu/messages/Modal'
import { Filter } from '../../components/iu/filter/Filter'

export const GestionServicios = () => {
  const { error,servicios,loading,eliminarServicio,obtenerTodosLosServicios,serviciosPorCategoria,successMessage,limpiarMensajeExito } = useServicios();
  const navigate = useNavigate();

  useEffect(() => {
    obtenerTodosLosServicios();
  }, []);

  const agregarServicio = () => {
    navigate('/admin/alta-servicio');
  }

  const modificarServicio = (servicio) =>{
    navigate(`/admin/modificar-servicio/${servicio.id}`)
  }

  const columns = [
    { header: 'Nombre', field: 'nombre' },
    { header: 'Categoría', field: 'categoriaNombre' },
    { header: 'Estado', field: 'disponibilidadNombre' },
    { header: 'Duración', field: 'tiempoDeDuracionMin' },
    { header: 'Precio', field: 'precio' }
  ];

  const optionsFilter = [
    {name:"TODOS", value:0},
    {name:"UÑAS", value:1},
    {name:"PESTAÑAS", value:2},
    {name:"CEJAS", value:3},
    {name:"PIES", value:4},
    {name:"PROMOS", value:5}
  ]


  return (
    <div className='container_page'>

      <Title text={"Panel de servicios"} />

      <Filter optionFilter={optionsFilter} onFilter={serviciosPorCategoria}/>

      <Table columns={columns} datos={servicios} textBtn1={"Modificar"} textBtn2={"Eliminar"} actionBtn1={modificarServicio} actionBtn2={eliminarServicio} />

      {loading && <Spinner />}

      {error && (<MessageError error={error} />)}

      {successMessage && (
        <Modal mensaje={successMessage} alCerrar={limpiarMensajeExito} />
      )}

      <ButtonRedirect btn_variant={"btn_primary"} width_btn={"btn_small"} textBtn={"AGREGAR SERVICIO"} actionRedirect={agregarServicio} />

    </div>
  )
}
