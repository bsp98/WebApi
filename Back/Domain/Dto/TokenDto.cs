using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class TokenDto
    {
        public string AccesoToken { get; set; }
        public string NombreUsuario { get; set; }
        public string EmailUsuario { get; set; }
        public string RolUsuario { get; set; }


    }
}
