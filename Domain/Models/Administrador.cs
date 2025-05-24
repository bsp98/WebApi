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

        public override void Validar()
        {
            base.Validar();
        }


    }
}
