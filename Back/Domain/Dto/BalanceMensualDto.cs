using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class BalanceMensualDto
    {
        public int Anio { get; set; }
        public int Mes { get; set; }
        public double Ingresos { get; set; }
        public double Egresos { get; set; }
        public double Balance { get; set; }
    }
}
