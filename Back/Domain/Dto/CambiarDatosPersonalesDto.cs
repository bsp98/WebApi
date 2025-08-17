using Domain.Exceptions;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class CambiarDatosPersonalesDto:IValidable
    {
        public string Nombre { get; set; }

        public string Apellido { get; set; }

        public string Celular { get; set; }


        public CambiarDatosPersonalesDto() { }

        public CambiarDatosPersonalesDto(string nombre, string apellido, string celular)
        {
            Nombre=nombre;
            Apellido=apellido;
            Celular=celular;
        }

        public void Validar() {
            ValidarNombreYApelllido();
            ValidarCel();
        
        }

        private void ValidarCel()
        {
            if (string.IsNullOrEmpty(Celular))
                throw new DatoIncorrectoException("El número de celular no puede estar vacío.");

            if (!Regex.IsMatch(Celular, @"^09\d{7}$"))
                throw new DatoIncorrectoException("El celular debe comenzar con 09 y tener 9 dígitos.");
        }

        private void ValidarNombreYApelllido()
        {
            if(string.IsNullOrEmpty(Nombre))
                throw new DatoIncorrectoException("El nombre no puede estar vacío.");
            if (string.IsNullOrEmpty(Apellido))
                throw new DatoIncorrectoException("El apellido no puede estar vacío.");
        }
    }
}
