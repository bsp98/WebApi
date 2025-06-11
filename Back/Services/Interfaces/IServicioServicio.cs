using Domain.Models;
using Domain.Dto;

using Services.Interfaces.CRUD;
using Domain.Enum;

namespace Services.Interfaces
{
    public interface IServicioServicio:IServicioAdd<ServicioDto>, IServicioRemove<ServicioDto>,IServicioUpdate<ServicioDto>, IServicioGetAll<ServicioDto>, IServicioGetById<ServicioDto>
    {
        List<ServicioDto> ObtenerPorCategoria(CategoriaServicio categoria);
        public void DeshabilitarOHabilitar(int id);

    }
}
