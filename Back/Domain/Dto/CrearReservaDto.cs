using Domain.Exceptions;
using Domain.Interfaces;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class CrearReservaDto : IValidable
    {
        public DateTime Fecha { get; set; }
        public int? ClienteId { get; set; }
        public string? NombreCliente { get; set; }
        public string? ApellidoCliente { get; set; }
        public string? EmailCliente { get; set; }
        public string? CelularCliente { get; set; }
        public int ServicioId { get; set; }
        public TimeSpan HoraInicio { get; set; }




        public CrearReservaDto()
        {

        }


        public void Validar()
        {
            ValidarFecha();
            ValidarServicio();
            ValidarCliente();
            ValidarEmail();
            ValidarCelular();
        }

        private void ValidarServicio()
        {
            if (ServicioId == null)
                throw new DatoIncorrectoException("Se debe seleccionar un servicio.");
        }

        private void ValidarFecha()
        {
            if (Fecha == null)
                throw new FechaInvalidaException("La fecha no puede ser nula.");

            if (Fecha <= DateTime.Now)
                throw new FechaInvalidaException("La fecha debe ser una fecha posterior a la actual");
        }


        private void ValidarCliente()
        {
            if (ClienteId == null)
            {
                if (string.IsNullOrWhiteSpace(NombreCliente))
                    throw new DatoIncorrectoException("Debe ingresar su nombre.");
                if (string.IsNullOrWhiteSpace(ApellidoCliente))
                    throw new DatoIncorrectoException("Debe ingresar su apellido.");
                if (string.IsNullOrWhiteSpace(EmailCliente))
                    throw new DatoIncorrectoException("Debe ingresar su correo electrónico.");
                if (string.IsNullOrWhiteSpace(CelularCliente))
                    throw new DatoIncorrectoException("Debe ingresar su teléfono.");
            }
        }
        public void ValidarCelular()
        {
            if (ClienteId == null)
            {

                if (!Regex.IsMatch(CelularCliente, @"^09\d{7}$"))
                    throw new DatoIncorrectoException("El número de celular debe comenzar con 09 y tener 9 dígitos.");
            }

        }

        private void ValidarEmail()
        {
            if (ClienteId == null)
            {
                if (!EsEmailValido(EmailCliente))
                {
                    throw new DatoIncorrectoException("El Email no cumple el formato (@gmail.com)");
                }

            }

        }

        private bool EsEmailValido(string _email)
        {
            string patron = @"^[a-zA-Z0-9._%+-]+@gmail\.com$";

            return Regex.IsMatch(_email, patron);
        }
    }
}
