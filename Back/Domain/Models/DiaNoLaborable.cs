using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class DiaNoLaborable
    {
        public int Id { get; set; }         
        public DateTime Fecha { get; set; }

        public DiaNoLaborable(int id, DateTime fecha)
        {
            Id = id;
            Fecha = fecha;
        }
        public DiaNoLaborable() { }

    }
}
