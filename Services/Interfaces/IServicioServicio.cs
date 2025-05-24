using Domain.Models;
using Domain.Dto;

using Services.Interfaces.CRUD;

namespace Services.Interfaces
{
    public interface IServicioServicio:IServicioAdd<ServicioDto>, IServicioRemove<ServicioDto>,IServicioUpdate<ServicioDto>
    {
    }
}
