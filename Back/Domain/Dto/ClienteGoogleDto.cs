using Domain.Exceptions;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class ClienteGoogleDto:UsuarioDto
    {
        public ClienteGoogleDto(string email, string nombre, string apellido) : base(email,nombre, apellido)
        {
            Email = email;
            Nombre = nombre;
            Apellido = apellido;
            TipoUsuario = TipoUsuario.Cliente;
        }
        public ClienteGoogleDto() { }

        public virtual void Validar()
        {
            ValidarApellido();
            ValidarNombre();
            ValidarEmail();
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


    }





}
