using Domain.Enum;
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
    public class EgresoDto:IValidable
    {
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public CategoriaEgreso? CategoriaEgreso { get; set; }

        public string NombreCategoria  { get; set; } = string.Empty;
        public Double Monto { get; set; }
        public string Lugar { get; set; }
        public string Descripcion { get; set; }

        public EgresoDto(DateTime fecha, CategoriaEgreso categoriaEgreso, double monto,string lugar, string descripcion)
        {
            Fecha=fecha;
            CategoriaEgreso=categoriaEgreso;
            Monto=monto;
            Lugar=lugar;
            Descripcion=descripcion;
        }

        public EgresoDto() { }

        public void Validar()
        {
            ValidarFecha();
            ValidarMonto();
            ValidarCategoria();
        }

        private void ValidarMonto()
        {
            if (Monto == null)
                throw new DatoIncorrectoException("El monto no puede ser nula.");
        }

        private void ValidarFecha()
        {
            if (Fecha == null)
                throw new DatoIncorrectoException("La fecha no puede ser nula.");
        }

        private void ValidarCategoria()
        {
            if (CategoriaEgreso == null)
                throw new DatoIncorrectoException("Debe seleccionar una categoría.");
        }


    }
}
