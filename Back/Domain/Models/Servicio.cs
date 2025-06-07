using Domain.Interfaces;
using Domain.Enum;

namespace Domain.Models
{
    public class Servicio
    {

        public int ServicioId { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion  { get; set; }
        public double Precio { get; set; }
        public int Descuento { get; set; }
        public bool Disponibilidad{ get; set; }
        public CategoriaServicio Categoria { get; set; }
        public int TiempoDeDuracionMin { get; set; }

        public Servicio(string nombre, string descripcion, double precio,int descuento, bool disponibilidad, CategoriaServicio categoria, int tiempoDeDuracionMin)
        {
            Nombre = nombre;
            Descripcion = descripcion;
            Precio = precio;
            Descuento = descuento;
            Disponibilidad = disponibilidad;
            Categoria = categoria;
            TiempoDeDuracionMin = tiempoDeDuracionMin;
        }
    }
}
