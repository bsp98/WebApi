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
    public interface IServicioReserva : IServicioAdd<ReservaDto>, IServicioRemove<ReservaDto>, IServicioUpdate<ReservaDto>, IServicioGetAll<ReservaDto>, IServicioGetById<ReservaDto>
    {

        List<BloqueHorarioDto> ObtenerBloquesInicioDisponibles(DateTime fecha, int duracionMinutos);
        List<ReservaDto> FiltrarReservas(ReservaFiltroDto filtros);
        void CancelarReserva(int id);
       
    }
}

