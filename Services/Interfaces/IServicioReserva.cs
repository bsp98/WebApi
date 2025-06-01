using Domain.Dto;
using Services.Interfaces.CRUD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IServicioReserva : IServicioAdd<ReservaDto>, IServicioRemove<ReservaDto>, IServicioUpdate<ReservaDto>
    {
        List<ReservaDto> ObtenerTodos();

        ReservaDto? BuscarPorId(int id);
    }
}

