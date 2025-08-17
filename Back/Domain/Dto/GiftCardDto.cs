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
        public string NombreComprador { get; set; }
        public string EmailComprador { get; set; }
        public string NombreDestinatario { get; set; }
        public string CelularComprador { get; set; }
        public string Mensaje { get; set; }

        public GiftCardDto(double monto, string nombreComprador, string emailComprador, string nombreDestinatario, string celularComprador, string mensaje)
        {
            Monto=monto;
            NombreComprador = nombreComprador;
            EmailComprador = emailComprador;
            NombreDestinatario=nombreDestinatario;
            CelularComprador = celularComprador;
            Mensaje=mensaje;
        }
        public GiftCardDto() { }


        public void Validar()
        {
            ValidarMonto();
            ValidarNombreComprador();
            ValidarEmailComprador();
            ValidarCelularComprador();
        }

        private void ValidarCelularComprador()
        {
            if (string.IsNullOrEmpty(CelularComprador))
                throw new DatoIncorrectoException("El Celular del comprador no puede estar vacío.");
        }

        private void ValidarEmailComprador()
        {
            if (string.IsNullOrEmpty(EmailComprador))
                throw new DatoIncorrectoException("El Email del comprador no puede estar vacío.");
            if (!EsEmailValido(EmailComprador))
            {
                throw new DatoIncorrectoException("El Email del comprador no cumple el formato (@gmail.com)");
            }
        }

        //private void ValidarEmailDestinatario()
        //{
        //    if (string.IsNullOrEmpty(EmailDestinatario))
        //        throw new DatoIncorrectoException("El EmailDestinatario no puede estar vacío.");
        //    if (!EsEmailValido(EmailDestinatario))
        //    {
        //        throw new DatoIncorrectoException("El Email Destinatario no cumple el formato (@gmail.com)");
        //    }
        //}

        private void ValidarNombreComprador()
        {
            if (string.IsNullOrEmpty(NombreComprador))
                throw new DatoIncorrectoException("El Nombre del comprador no puede estar vacío.");
        }

        public void ValidarMonto()
        {
            if (Monto == null)
                throw new DatoIncorrectoException("El monto no puede ser nula.");

        }
        

        private bool EsEmailValido(string _email)
        {
            string patron = @"^[a-zA-Z0-9._%+-]+@gmail\.com$";

            return Regex.IsMatch(_email, patron);
        }



    }
}