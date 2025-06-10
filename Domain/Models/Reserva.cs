using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Reserva
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public double Precio { get; set; }
        public bool Disponibilidad { get; set; }
        public DateTime Fecha { get; set; }
        public Cliente Cliente { get; set; }
        public List<Servicio> Servicios { get; set; }

        public Reserva(string nombre, string descripcion, double precio, bool disponibilidad, DateTime fecha)
        {
            Nombre = nombre;
            Descripcion = descripcion;
            Precio = precio;
            Disponibilidad = disponibilidad;
            Fecha= fecha;
        }


        public string ObtenerNombreCliente() {
            return Cliente.Nombre;
        }

        public string ObtenerNombreServicio()
        { return null;
           
        }

    }
}
