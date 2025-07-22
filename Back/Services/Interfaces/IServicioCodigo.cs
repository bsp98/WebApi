using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IServicioCodigo
    {
        void GuardarCodigo(string email, string codigo);
        bool VerificarCodigo(string email, string codigo);
        void EliminarCodigo(string email);
    }
}
