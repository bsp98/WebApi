using Domain.Exceptions;
using Domain.Interfaces;
using Domain.Models;
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
        public double PrecioTotal { get; set; }
        public DateTime Fecha { get; set; }
        public ClienteDto Cliente { get; set; }
        public List<ServicioDto> Servicios { get; set; }

        //public EstadoDePAGO EstadoPago;
        public Boolean Cancelada { get; set; }

        public ReservaDto( double precioTotal, DateTime fecha, ClienteDto cliente, List<ServicioDto> servicios)
        {

            PrecioTotal=precioTotal;
            Fecha=fecha;
            Cliente=cliente;
            Servicios=servicios;
            Cancelada=false;
        }

        public ReservaDto() { }

        public void Validar() 
        {
          
            ValidarPrecio();
            ValidarFecha();
        
        }

        private void ValidarFecha()
        {
            if (Fecha == null)
                throw new DatoIncorrectoException("La fecha no puede ser nula.");

            if (Fecha <= DateTime.Now)
                throw new DatoIncorrectoException("La fecha de nacimiento debe ser una fecha en el futuro.");
        }

        private void ValidarPrecio()
        {
            throw new NotImplementedException();
        }


        public double CalcularPrecio() { //????
            return 4;

                                       
       }
    }
}
