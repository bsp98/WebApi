using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Administrador:Usuario
    {
        public Administrador()
        {
        }

        public Administrador(string email, string password, string nombre, string apellido, TipoUsuario tipoUsuario) : base(email, password, nombre, apellido,tipoUsuario)
        {
            Email = email;
            Password = password;
            Nombre = nombre;
            Apellido = apellido;
            TipoUsuario = tipoUsuario;

        }
    }
}
