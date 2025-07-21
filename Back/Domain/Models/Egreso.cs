using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Egreso
    {
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public CategoriaEgreso CategoriaEgreso { get; set; }
        public Double Monto  { get; set; }
        public string Descripcion { get; set; }

        public Egreso(DateTime fecha, CategoriaEgreso categoriaEgreso, double monto, string descripcion)
        {
            Fecha=fecha;
            CategoriaEgreso=categoriaEgreso;
            Monto=monto;
            Descripcion=descripcion;
        }

        public Egreso() { }
    }
}
