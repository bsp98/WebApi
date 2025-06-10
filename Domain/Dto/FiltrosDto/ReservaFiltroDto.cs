using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto.FiltrosDto
{
    public class ReservaFiltroDto
    {
        public string? Nombrecliente { get; set; }
        public DateTime? Fecha { get; set; }
        public string? Nombreservicio { get; set; }
    }
}
