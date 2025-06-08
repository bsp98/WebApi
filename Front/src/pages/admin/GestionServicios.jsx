import React from 'react'
import { Title } from '../../components/iu/texts/Title'
import { Table } from '../../components/iu/table/Table'
import { ButtonRedirect } from '../../components/iu/buttons/ButtonRedirect'
import { useNavigate } from 'react-router-dom'
import { useServicios } from '../../hooks/useServicios';
import { useEffect } from 'react'

export const GestionServicios = () => {
  const { error, servicios, loading, obtenerTodosLosServicios } = useServicios();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("se ejecuto el useefect");
    obtenerTodosLosServicios();
  }, []);

  const agregarServicio = () => {
    navigate('/admin/alta-servicio');
  }

  {/*
      1- por defecto muestro todos los servicios
      2- aplicar los filtros de servicio
      3- si se preciona todos se realiza la funcion debotener todos y si no se realiza la funcion de categoria segun el valor del boton
      
      */}
  const columns = [
    { header: 'Nombre', field: 'nombre' },
    { header: 'Categoría', field: 'categoriaNombre' },
    { header: 'Estado', field: 'disponibilidadNombre' },
    { header: 'Duración', field: 'tiempoDeDuracionMin' },
    { header: 'Precio', field: 'precio' }
  ];


  return (
    <div className='container_page'>

      <Title text={"Panel de servicios"} />
      {console.log("estos son los servicios cargados:")}
      {console.log(servicios)}
      <Table columns={columns} datos={servicios} textBtn1={"Modificar"} textBtn2={"Eliminar"} actionBtn1={"funcModifica"} actionBtn2={"funcEliminar"} />

      <ButtonRedirect textBtn={"AGREGAR SERVICIO"} actionRedirect={agregarServicio} />



    </div>
  )
}
