using DataAcces.Interfaces.CRUD;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcces.Interfaces
{
    public  interface IRepositorioBloqueHorario : IRepositoryAdd<BloqueHorario>, IRepositoryGetAll<BloqueHorario>,IRepositoryUpdate<BloqueHorario>
    {
    }
}
