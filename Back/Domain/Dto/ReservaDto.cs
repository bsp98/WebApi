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
        public double PrecioTotal { get; set; }
        public DateTime Fecha { get; set; }
    
        [JsonIgnore]
        public ClienteDto? Cliente { get; set; }
        public int ClienteId { get; set; }
        public int ServicioId { get; set; }
        [JsonIgnore]
        public ServicioDto? Servicioo { get; set; }    
        public TimeSpan HoraInicio { get; set; }
        public TimeSpan HoraFin { get; set; }

        //public EstadoDePago EstadoPago;
        public Boolean Cancelada { get; set; }

        public ReservaDto( double precioTotal, DateTime fecha,TimeSpan horaInicio, TimeSpan horaFin)
        {

            PrecioTotal=precioTotal;
            Fecha=fecha;
           // Cliente=cliente;
           // Servicioo=servicio;
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

            if (Fecha <= DateTime.Now)
                throw new DatoIncorrectoException("La fecha debe ser una fecha en el futuro");
        }

   


      
    }
}
