using DataAcces.Interfaces.CRUD;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcces.Interfaces
{
    public interface IRepositorioEgreso: IRepositoryAdd<Egreso>, IRepositoryRemove<Egreso>, IRepositoryUpdate<Egreso>, IRepositoryGetAll<Egreso>, IRepositoryGetById<Egreso>
    {
    }
}
