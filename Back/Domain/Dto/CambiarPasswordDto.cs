using Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class CambiarPasswordDto
    {
        public string PasswordActual { get; set; } = string.Empty;
        public string NuevaPassword { get; set; } = string.Empty;

        public void Validar()
        {
            if (string.IsNullOrWhiteSpace(NuevaPassword))
                throw new DatoIncorrectoException("La contraseña no puede estar vacía.");
            if (NuevaPassword.Length < 6)
                throw new DatoIncorrectoException("La contraseña debe tener al menos 6 caracteres.");
            if (!NuevaPassword.Any(char.IsUpper))
                throw new DatoIncorrectoException("Debe contener al menos una letra mayúscula.");
            if (!NuevaPassword.Any(char.IsLower))
                throw new DatoIncorrectoException("Debe contener al menos una letra minúscula.");
            if (!NuevaPassword.Any(char.IsDigit))
                throw new DatoIncorrectoException("Debe contener al menos un número.");
        }
    }
}
