import './estadisticas.css'
import { Title } from '../../../components/iu/texts/Title'
import { useEffect } from 'react'
import { MessageError } from '../../../components/iu/messages/MessageError'
import { Spinner } from '../../../components/iu/spinner/Spinner'
import { Table } from '../../../components/iu/table/Table'
import { useEstadisticas } from '../../../hooks/useEstadisticas';
import { Card } from '../../../components/estadistica/card/Card'
import { FilterBusquedaNumeric } from '../../../components/iu/filter/FilterBusquedaNumeric';

export const Estadisticas = () => {
  const { balances, serviciosEstadistica, egresos, ingresos, balance, loading, error, obtenerResumenEstadistico, obtenerResumenEstadisticoActual } = useEstadisticas();

  useEffect(() => {
    obtenerResumenEstadisticoActual();
  }, []);

  const columnsBalances = [
    { header: 'Año', render: (dato) => dato.anio },
    { header: 'Mes', render: (dato) => dato.mes },
    { header: 'Hora', render: (dato) => dato.ingresos },
    { header: 'Fecha', render: (dato) => dato.egresos },
    { header: 'Estado de pago', render: (dato) => dato.balance }
  ];

  const columnsServicios = [
    { header: 'Nombre', render: (dato) => dato.nombre },
    { header: 'Categoría', render: (dato) => dato.categoria },
    { header: 'Percio', render: (dato) => dato.precio },
    { header: 'Porcentaje', render: (dato) => dato.porcentaje },
    { header: 'Ganancia', render: (dato) => dato.ganancia }
  ];

  return (
    <div className='container_page'>

      <Title text={"Estadísticas"} />

      <div className='container_cards_balances'>
        <Card type={"INGRESOS"} monto={ingresos} />
        <Card type={"EGRESOS"} monto={egresos} />
        <Card type={"BALANCE"} monto={balance} colorStyle={balance > 0 ? "coloMontoPositive" : "coloMontoNegative"} />
      </div>

      <div className='container_filter_numeric'>
        <FilterBusquedaNumeric actionOnSubmit={obtenerResumenEstadistico} label1={"Año"} name1={"anio"} placeholder1={"Ingrese el año"} />
      </div>


      {error && <MessageError error={error} />}

      <div className="table_balances">
        <p>Listado de balances</p>
        <Table columns={columnsBalances} datos={balances} table_width={"table_big"} class_margin={"table_margin_none"} />
        {loading && <Spinner />}
      </div>

      <div className="table_servicios_estadistica">
        <p>Estadística de servicios</p>
        <Table columns={columnsServicios} datos={serviciosEstadistica} table_width={"table_big"} class_margin={"table_margin_none"} />
        {loading && <Spinner />}
      </div>

    </div>
  )
}
