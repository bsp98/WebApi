using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Exceptions
{
    public class TieneReservas:Exception
    {
        public TieneReservas(string mensaje) : base(mensaje) { }
    }
}
