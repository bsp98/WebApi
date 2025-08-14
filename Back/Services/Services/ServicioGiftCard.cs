using Domain.Dto;
using Microsoft.Extensions.Configuration;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class ServicioGiftCard:IServicioGiftCard
    {
        private readonly IServicioEmail _servicioEmail;
        private readonly IConfiguration _config;

        public ServicioGiftCard(IServicioEmail email, IConfiguration cfg)
        {
            _servicioEmail=email;
            _config=cfg;
        }



        public async Task EnviarSolicitudAsync(GiftCardDto r)
        {

            r.Validar();
            // const string emailAdmin = "maigiordano28@gmail.com";

            string emailAdmin = _config["EmailSettings:Admin"] ?? _config["EmailSettings:Remitente"];


            string asunto = $"Nueva Gift Card - {r.Monto:0.##} - {r.NombreSolicitante}";
            string mensaje = $@"
            <h3>¡Nueva solicitud de Gift Card!</h3>
            <p>Se recibió una solicitud desde el sitio.</p>
            <ul>
                <li><strong>Monto:</strong> {r.Monto:0.##}</li>
                <li><strong>Solicitante:</strong> {r.NombreSolicitante}</li>
                <li><strong>Email solicitante:</strong> {r.EmailSolicitante}</li>
                <li><strong>Destinatario:</strong> {r.NombreDestinatario}</li>
                <li><strong>Email destinatario:</strong> {(string.IsNullOrWhiteSpace(r.EmailDestinatario) ? "-" : r.EmailDestinatario)}</li>
                <li><strong>Teléfono solicitante:</strong> {(string.IsNullOrWhiteSpace(r.TelefonoSolicitante) ? "-" : r.TelefonoSolicitante)}</li>
                <li><strong>Mensaje:</strong> {(string.IsNullOrWhiteSpace(r.Mensaje) ? "-" : r.Mensaje)}</li>
            </ul>";

            // Email a admin
            await _servicioEmail.EnviarEmailAsync(emailAdmin, asunto, mensaje);

            if (!string.IsNullOrWhiteSpace(r.EmailSolicitante))
            {
                string asuntoCli = "Recibimos tu solicitud de Gift Card";
                string msgCli = $@"
                <h3>¡Gracias {r.NombreSolicitante}!</h3>
                <p>Registramos tu solicitud por {r.Monto:0.##}. Te contactamos a la brevedad para coordinar pago y entrega.</p>";
                await _servicioEmail.EnviarEmailAsync(r.EmailSolicitante, asuntoCli, msgCli);
            }

           
        }
    }

}

