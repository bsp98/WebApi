using Domain.Dto;
using Services.Interfaces.CRUD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IServicioPublicacion 
    {
        Task<PublicacionDto> CrearPublicacionAsync(CrearPublicacionDto dto, string rutaBaseWeb, string rutaFisicaAbsoluta);
        Task<List<PublicacionDto>> ObtenerTodasAsync();
        Task EliminarAsync(int id, string rutaWebRoot);
    }
}
