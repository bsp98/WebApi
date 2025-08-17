using Domain.Enum;
using Domain.Exceptions;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class ModificarInterfazPagoDto : IValidable
    {
        public TiposDePago TipoDePago { get; set; }
        public string ?NombreTipoDePago { get; set; }

        public ModificarInterfazPagoDto(TiposDePago tiposDePago)
        {
            TipoDePago = tiposDePago;
        }

        public ModificarInterfazPagoDto()
        {
            
        }

        public void Validar()
        {
            if (TipoDePago == null)
            {
                throw new DatoIncorrectoException("Debe haber un tipo de pago");
            }
        }
    }
}
