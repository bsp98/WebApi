using Domain.Interfaces;

namespace Domain.Models
{
    public class Servicio:IValidable
    {

        public int ServicioId { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion  { get; set; }
        public double Precio { get; set; }
        public bool Disponibilidad{ get; set; }

        public Servicio(string nombre, string descripcion, double precio, bool disponibilidad)
        {
            Nombre = nombre;
            Descripcion = descripcion;
            Precio = precio;
            Disponibilidad = disponibilidad;
        }
    }
}
