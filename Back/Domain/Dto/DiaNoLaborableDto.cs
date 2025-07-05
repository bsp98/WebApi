using Domain.Exceptions;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    
        public class DiaNoLaborableDto: IValidable
        {
            public int Id { get; set; }
            public DateTime Fecha { get; set; }

            public DiaNoLaborableDto(int id, DateTime fecha)
            {
                Id = id;
                Fecha = fecha;
            }

        public DiaNoLaborableDto() { }

        public void Validar()
        {
            ValidarFecha();
        }

        public void ValidarFecha()
        {
            if (Fecha == null)
                throw new DatoIncorrectoException("La fecha no puede ser nula.");

            if (Fecha <= DateTime.Now)
                throw new DatoIncorrectoException("La fecha debe ser una fecha en el futuro.");
        }

    }
    
}
