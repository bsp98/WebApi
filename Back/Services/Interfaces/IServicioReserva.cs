using Domain.Dto;
using Domain.Dto.FiltrosDto;
using Domain.Enum;
using Services.Interfaces.CRUD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IServicioReserva : IServicioRemove<ReservaDto>, IServicioUpdate<ReservaDto>, IServicioGetAll<ReservaDto>, IServicioGetById<ReservaDto>
    {

        ReservaDto Add(CrearReservaDto dto);
        List<BloqueHorarioDto> ObtenerBloquesInicioDisponibles(DateTime fecha, int duracionMinutos);
        List<ReservaDto> FiltrarReservas(ReservaFiltroDto filtros);
        Task CancelarReserva(int id);
        void Reagendar(int id, DateTime fecha, TimeSpan horaInicio);

        void ModificarEstadoDePago(int id,TiposDeEstado estado);


    }
}

