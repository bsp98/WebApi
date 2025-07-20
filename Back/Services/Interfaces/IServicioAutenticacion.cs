using Domain.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IServicioAutenticacion
    {
        public UsuarioDto? Login(string email, string password);
        public string GenerarTokenJwt(string emailUsuario, string nombreUsuario, string rol, int id);
    }
}
