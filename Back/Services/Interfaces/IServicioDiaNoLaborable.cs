using Domain.Models;
using Domain.Dto;
using Services.Interfaces.CRUD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IServicioDiaNoLaborable : IServicioGetAll<DiaNoLaborableDto>, IServicioAdd<DiaNoLaborableDto>, IServicioRemove<DiaNoLaborableDto>
    {

    }
}
