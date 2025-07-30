using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto.FiltrosDto
{
    public class EgresoFiltrosDto
    {
        public DateTime? Fecha { get; set; }
        public CategoriaEgreso? CategoriaEgreso { get; set; }
    }
}
