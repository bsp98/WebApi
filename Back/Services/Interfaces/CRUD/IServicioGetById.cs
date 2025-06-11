using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces.CRUD
{
    public interface IServicioGetById<T>
    {
        public T GetById(int id);
    }
}
