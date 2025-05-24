using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class AdministradorDto:UsuarioDto
    {


        public AdministradorDto() { }


        public override void Validar()
        {
            base.Validar();
        }


    }
}
