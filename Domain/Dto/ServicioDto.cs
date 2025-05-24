using Domain.Interfaces;
using Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Enum;

namespace Domain.Dto
{
    public class ServicioDto: IValidable
    {
        public int ServicioId { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; }
        public double Precio { get; set; }
        public bool Disponibilidad { get; set; }
        public CategoriaServicio Categoria { get; set; }
        public int TiempoDeDuracionMin { get; set; }


        public ServicioDto()
        {
        }

        public ServicioDto(string nombre, string descripcion, double precio, bool disponibilidad,CategoriaServicio categoria, int tiempoDeDuracionMin)
        {
            Nombre = nombre;
            Descripcion = descripcion;
            Precio = precio;
            Disponibilidad = disponibilidad;
            Categoria = categoria;
            TiempoDeDuracionMin = tiempoDeDuracionMin;
        }

        public void Validar()
        {
            if (string.IsNullOrEmpty(Nombre))
            {
                throw new DatoIncorrectoException("Se debe asignar un nombre al Servicio");
            }
            else if (string.IsNullOrEmpty(Descripcion))
            {
                throw new DatoIncorrectoException("Se debe asignar una descripcion al Servicio");
            }
            else if (Precio <= 0)
            {
                throw new DatoIncorrectoException("El precio del servicio debe ser mayor a 0");
            }
            else if (TiempoDeDuracionMin <= 0)
            {
                throw new DatoIncorrectoException("La duracion del servicio debe ser mayor a 0");
            }
        }
    }
}
