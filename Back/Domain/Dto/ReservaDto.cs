using Domain.Enum;
using Domain.Exceptions;
using Domain.Interfaces;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class ReservaDto:IValidable
    {
        public int Id { get; set; }
        public double? PrecioTotal { get; set; }
        public DateTime Fecha { get; set; }

        public ClienteDto? Cliente { get; set; } 
        public int ClienteId { get; set; }

        public string? NombreCliente { get; set; }

        public string? ApellidoCliente { get; set; }
        public string? EmailCliente { get; set; }
        public string? CelularCliente { get; set; }
        public TiposDeEstado EstadoDePago { get; set; }
        public string NombreEstadoDePago { get; set; }
        public ServicioDto? Servicio { get; set; }  
        public int ServicioId { get; set; }

        public TimeSpan HoraInicio { get; set; }
        public TimeSpan HoraFin { get; set; }

        public bool Cancelada { get; set; }



        public ReservaDto( double precioTotal, DateTime fecha,TimeSpan horaInicio, TimeSpan horaFin,TiposDeEstado estadoDePago/*, ClienteDto cliente, ServicioDto servicio*/)
        {

            PrecioTotal=precioTotal;
            Fecha=fecha;
            //Cliente=cliente;
            //Servicioo=servicio;
            EstadoDePago=estadoDePago;
            Cancelada=false;
            HoraInicio = horaInicio;
            HoraFin = horaFin;
        }

     

        public ReservaDto() { }

        public void Validar() 
        {
            ValidarFecha();
            ValidarServicio();
        }

        private void ValidarServicio()
        {
            if (ServicioId == null)
                throw new DatoIncorrectoException("El servicio no puede ser nula.");
        }

        private void ValidarFecha()
        {
            if (Fecha == null)
                throw new DatoIncorrectoException("La fecha no puede ser nula.");

            Fecha = Fecha.Date;

            if (Fecha <= DateTime.Now)
                throw new DatoIncorrectoException("La fecha debe ser una fecha en el futuro");
        }

   
       
      
    }
}
