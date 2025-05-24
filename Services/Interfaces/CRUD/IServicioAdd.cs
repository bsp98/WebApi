using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces.CRUD
{
    public interface IServicioAdd<T>
    {
        T Add(T dto);
    }
}
