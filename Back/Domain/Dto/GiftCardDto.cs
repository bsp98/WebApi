using Domain.Exceptions;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class GiftCardDto : IValidable
    {
        public double Monto { get; set; }
        public string NombreSolicitante { get; set; }
        public string EmailSolicitante { get; set; }
        public string NombreDestinatario { get; set; }
        public string EmailDestinatario { get; set; }
        public string TelefonoSolicitante { get; set; }
        public string Mensaje { get; set; }

        public GiftCardDto(double monto, string nombreSolicitante, string emailSolicitante, string nombreDestinatario, string emailDestinatario, string telefonoSolicitante, string mensaje)
        {
            Monto=monto;
            NombreSolicitante=nombreSolicitante;
            EmailSolicitante=emailSolicitante;
            NombreDestinatario=nombreDestinatario;
            EmailDestinatario=emailDestinatario;
            TelefonoSolicitante=telefonoSolicitante;
            Mensaje=mensaje;
        }
        public GiftCardDto() { }


        public void Validar()
        {
            ValidarMonto();
            ValidarNombreSolicitante();
            ValidarEmailSolicitante();
            ValidarEmailDestinatario();
            ValidarTelefonoSolicitante();
        }

        private void ValidarTelefonoSolicitante()
        {
            if (string.IsNullOrEmpty(TelefonoSolicitante))
                throw new DatoIncorrectoException("El TelefonoSolicitante no puede estar vacío.");
        }

        private void ValidarEmailSolicitante()
        {
            if (string.IsNullOrEmpty(EmailSolicitante))
                throw new DatoIncorrectoException("El EmailSolicitante no puede estar vacío.");
        }

        private void ValidarEmailDestinatario()
        {
            if (string.IsNullOrEmpty(EmailDestinatario))
                throw new DatoIncorrectoException("El EmailDestinatario no puede estar vacío.");
        }

        private void ValidarNombreSolicitante()
        {
            if (string.IsNullOrEmpty(NombreSolicitante))
                throw new DatoIncorrectoException("El NombreSolicitante no puede estar vacío.");
        }

        public void ValidarMonto()
        {
            if (Monto == null)
                throw new DatoIncorrectoException("El monto no puede ser nula.");

        }




    }
}