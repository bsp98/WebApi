using Domain.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IServicioEstadistica
    {
        GeneralEstadisticaDto ObtenerResumenGeneral(int? anioFiltro = null);

    }
}
