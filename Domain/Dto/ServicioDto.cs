using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class ServicioDto
    {
        public int ServicioId { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; }
        public double Precio { get; set; }
        public bool Disponibilidad { get; set; }

        public ServicioDto()
        {
        }

        public ServicioDto(string nombre, string descripcion, double precio, bool disponibilidad)
        {
            Nombre = nombre;
            Descripcion = descripcion;
            Precio = precio;
            Disponibilidad = disponibilidad;
        }
    }
}
