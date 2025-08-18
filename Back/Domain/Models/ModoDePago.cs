using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class ModoDePago
    { 
        public int Id { get; set; }
        public TiposDePago TipoDePago { get; set; }

        public ModoDePago(TiposDePago tiposDePago)
        {
            TipoDePago = tiposDePago;
        }

        public ModoDePago()
        {
        }
    }
}
