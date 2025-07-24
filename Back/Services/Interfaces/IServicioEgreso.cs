using Domain.Dto;
using Domain.Dto.FiltrosDto;
using Services.Interfaces.CRUD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IServicioEgreso : IServicioAdd<EgresoDto>, IServicioRemove<EgresoDto>, IServicioUpdate<EgresoDto>, IServicioGetAll<EgresoDto>, IServicioGetById<EgresoDto>
    {

        List<EgresoDto> FiltrarEgresos(EgresoFiltrosDto filtros);

    }
}
