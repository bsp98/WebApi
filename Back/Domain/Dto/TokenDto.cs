using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class TokenDto
    {
        public string AccesoToken { get; set; } = string.Empty;
        public int IdUsuario { get; set; }
        public string NombreUsuario { get; set; } = string.Empty;
        public string EmailUsuario { get; set; } = string.Empty;
        public string RolUsuario { get; set; } = string.Empty;


    }
}
