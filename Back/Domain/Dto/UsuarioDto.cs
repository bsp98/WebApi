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
    public abstract class UsuarioDto:IValidable
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;

        public string OrigenCreacion { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TipoUsuario Tipo { get; set; }

        public UsuarioDto(string email, string password, string nombre, string apellido, string origenCreacion, TipoUsuario tipo)
        {
            Email = email;
            Password = password;
            Nombre = nombre;
            Apellido = apellido;
            OrigenCreacion = origenCreacion;
            Tipo= tipo;
        }
        public UsuarioDto() { }

        public virtual void Validar()
        {
            ValidarApellido();
            ValidarNombre();

            if(OrigenCreacion != "admin" || Email != "") ValidarEmail();

            if(OrigenCreacion != "admin") ValidarPassword();
        }

       


        private void ValidarNombre()
        {
            if (string.IsNullOrEmpty(Nombre)) throw new DatoIncorrectoException("El nombre no puede estar vacío");

        }
        private void ValidarApellido()
        {
            if (string.IsNullOrEmpty(Apellido)) throw new DatoIncorrectoException("El apellido no puede estar vacío");

        }

        private void ValidarEmail()
        {
            if (string.IsNullOrEmpty(Email)) throw new DatoIncorrectoException("El email no puede estar vacío");
            if (!EsEmailValido(Email))
            {
                throw new DatoIncorrectoException("El Email no cumple el formato (@gmail.com)");
            }


        }

        private bool EsEmailValido(string _email)
        {
            string patron = @"^[a-zA-Z0-9._%+-]+@gmail\.com$";

            return Regex.IsMatch(_email, patron);
        }


        private void ValidarPassword()
        {
            if (string.IsNullOrEmpty(Password)) throw new DatoIncorrectoException("El password no puede estar vacío");
            if (Password.Length<6) throw new DatoIncorrectoException("La contrasenia tiene que tener al menos 6 caracteres");

            if (!ContieneMayuscula(Password))
            {
                throw new DatoIncorrectoException("La contrasenia tiene que contener al menos una letra mayuscula");
            }

            if (!ContieneMinuscula(Password))
            {
                throw new DatoIncorrectoException("La contrasenia tiene que contener al menos una letra minuscula");
            }

            if (!ContieneDigito(Password))
            {
                throw new DatoIncorrectoException("La contrasenia tiene que contener al menos una digito");
            }

            if (!ContienePuntuacion(Password))
            {
                throw new DatoIncorrectoException("La contrasenia tiene que contener al menos un signo de puntuacion ");
            }


            if (Password != Password.Trim())
            {
                throw new DatoIncorrectoException("La contrasenia no puede tener espacios ni al principio ni al final");
            }
        }


        private bool ContienePuntuacion(string _password)
        {
            return _password.Any(char.IsPunctuation);
        }
        private bool ContieneDigito(string _password)
        {
            return _password.Any(char.IsDigit);
        }
        private bool ContieneMinuscula(string _password)
        {
            return _password.Any(char.IsLower);
        }
        private bool ContieneMayuscula(string _password)
        {
            return _password.Any(char.IsUpper);
        }
    }
}

