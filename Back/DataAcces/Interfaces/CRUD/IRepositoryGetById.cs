using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcces.Interfaces.CRUD
{
    public interface IRepositoryGetById<T>
    {
        public T GetById(int id);
    }
}
