using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions
{
    public class FechaInvalidaException:Exception
    {
        public FechaInvalidaException(string mensaje) : base(mensaje) { }
    }
}
