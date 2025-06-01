using Domain.Exceptions;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class ReservaDto:IValidable
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public double Precio { get; set; }
        public bool Disponibilidad { get; set; }

        public ReservaDto(string nombre, string descripcion, double precio)
        {
            Nombre = nombre;
            Descripcion = descripcion;
            Precio = precio;
            Disponibilidad = true;
        }

        public void Validar() 
        {
            ValidarNombre();
            ValidarDescripcion();
            ValidarPrecio();
        
        }

        private void ValidarPrecio()
        {
            throw new NotImplementedException();
        }

        private void ValidarDescripcion()
        {
            if (string.IsNullOrEmpty(Descripcion))
                throw new DatoIncorrectoException("La descripcion no puede estar vacío.");
        }

        private void ValidarNombre()
        {
            if (string.IsNullOrEmpty(Nombre))
                throw new DatoIncorrectoException("El nombre no puede estar vacío."); ;
        }

        public void CambiarDisponibilidad() {
            Disponibilidad=false;
        }

        public double CalcularPrecio() { //????
            return 4;

                                       
       }
    }
}
