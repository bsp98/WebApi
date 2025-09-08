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
        public string Lugar { get; set; } = string.Empty;
        public Double Monto  { get; set; }
        public string Descripcion { get; set; } = string.Empty;

        public Egreso(DateTime fecha, CategoriaEgreso categoriaEgreso, double monto,string lugar, string descripcion)
        {
            Fecha=fecha;
            CategoriaEgreso=categoriaEgreso;
            Monto=monto;
            Lugar=lugar;
            Descripcion=descripcion;
        }

        public Egreso() { }
    }
}
