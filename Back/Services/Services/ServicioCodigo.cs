using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class ServicioCodigo : IServicioCodigo
    {
        private readonly Dictionary<string, (string codigo, DateTime expiracion)> _codigos = new();

        public void GuardarCodigo(string email, string codigo)
        {
            _codigos[email] = (codigo, DateTime.UtcNow.AddMinutes(10));
        }

        public bool VerificarCodigo(string email, string codigo)
        {
            if (!_codigos.ContainsKey(email)) return false;
            var (guardado, expiracion) = _codigos[email];
            if (DateTime.UtcNow > expiracion) return false;
            return guardado.Trim() == codigo.Trim();
        }

        public void EliminarCodigo(string email)
        {
            _codigos.Remove(email);
        }
    }
}
