using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces.CRUD
{
    public interface IServicioUpdate<T>
    {
        void Update(int id, T dto);
    }
}
