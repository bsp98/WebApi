using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class GeneralEstadisticaDto
    {
        public double TotalIngresos { get; set; }
        public double TotalEgresos { get; set; }
        public double Balance => TotalIngresos - TotalEgresos;
        public List<BalanceMensualDto> BalancesMensuales { get; set; }
        public List<EstadisticaServicioDto> EstadisticasServicios { get; set; }
    }
}
