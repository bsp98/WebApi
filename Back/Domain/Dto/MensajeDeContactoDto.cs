using Domain.Exceptions;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class MensajeDeContactoDto : IValidable
    {
        public string Nombre {  get; set; }
        public string Apellido { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public string Mensaje {  get; set; }

        public MensajeDeContactoDto(string nombre, string apellido, string email,string telefono, string mensaje)
        {
            Nombre = nombre;
            Apellido = apellido;
            Email = email;
            Telefono = telefono;
            Mensaje = mensaje;
        }

        public void Validar() 
        {

            if (string.IsNullOrEmpty(Nombre))
            {
                throw new DatoIncorrectoException("El mensaje debe tener un nombre");
            }

            if (string.IsNullOrEmpty(Apellido))
            {
                throw new DatoIncorrectoException("El mensaje debe tener un apellido");
            }
            if (string.IsNullOrEmpty(Email))
            {
                throw new DatoIncorrectoException("El mensaje debe tener un email");
            }
            if (string.IsNullOrEmpty(Telefono))
            {
                throw new DatoIncorrectoException("El mensaje debe tener un telefono");
            }
            if (string.IsNullOrEmpty(Descripcion))
            {
                throw new DatoIncorrectoException("El mensaje debe tener una descripcion");
            }
        }

    }
}
