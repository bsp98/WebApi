using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class EstadisticaServicioDto
    {
        public string Nombre { get; set; }
        public CategoriaServicio Categoria { get; set; }
        public double Precio { get; set; }
        public double Porcentaje { get; set; } // participación
        public double Ganancia { get; set; }
    }
}
