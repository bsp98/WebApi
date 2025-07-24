using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class OlvidoPasswordDto
    {
        public string Email { get; set; }
        public string Codigo { get; set; }
        public string NuevaPassword { get; set; }




        public void Validar()
        {
            if (string.IsNullOrWhiteSpace(NuevaPassword))
                throw new Exception("La contraseña no puede estar vacía.");
            if (NuevaPassword.Length < 6)
                throw new Exception("La contraseña debe tener al menos 6 caracteres.");
            if (!NuevaPassword.Any(char.IsUpper))
                throw new Exception("Debe contener al menos una letra mayúscula.");
            if (!NuevaPassword.Any(char.IsLower))
                throw new Exception("Debe contener al menos una letra minúscula.");
            if (!NuevaPassword.Any(char.IsDigit))
                throw new Exception("Debe contener al menos un número.");
        }
    }
}
