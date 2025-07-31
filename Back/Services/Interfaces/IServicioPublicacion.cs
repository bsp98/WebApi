using Domain.Dto;
using Services.Interfaces.CRUD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IServicioPublicacion : IServicioAdd<PublicacionDto>, IServicioRemove<PublicacionDto>, IServicioGetAll<PublicacionDto>
    {
       
    }
}
