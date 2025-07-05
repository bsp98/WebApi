using Domain.Exceptions;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class ReservaFechaHoraDto
    {
            public DateTime Fecha { get; set; }
            public TimeSpan HoraInicio { get; set; }



        public ReservaFechaHoraDto( DateTime fecha, TimeSpan horaInicio)
        {

            Fecha=fecha;
            HoraInicio = horaInicio;
        }

        public ReservaFechaHoraDto() { }

        public void Validar()
        {
            ValidarFecha();
          
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
