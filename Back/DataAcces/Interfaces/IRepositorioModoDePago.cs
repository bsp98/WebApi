using DataAcces.Interfaces.CRUD;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcces.Interfaces
{
    public interface IRepositorioModoDePago : IRepositoryAdd<ModoDePago>, IRepositoryUpdate<ModoDePago>, IRepositoryGetAll<ModoDePago>
    {

    }
}
