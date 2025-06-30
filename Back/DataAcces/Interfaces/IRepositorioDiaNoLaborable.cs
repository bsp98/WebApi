using DataAcces.Interfaces.CRUD;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcces.Interfaces
{
    public interface IRepositorioDiaNoLaborable: IRepositoryAdd<DiaNoLaborable>, IRepositoryRemove<DiaNoLaborable>, IRepositoryGetAll<DiaNoLaborable>, IRepositoryGetById<DiaNoLaborable>
    {
        public bool Existe(DateTime fecha);
    }
}
