using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Services.Interfaces;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;

namespace Services.Services
{
    public class ServicioEmail : IServicioEmail
    {
        private readonly IConfiguration _config;

        public ServicioEmail(IConfiguration config)
        {
            _config = config;
        }

        public async Task EnviarEmailAsync(string destinatario, string asunto, string mensajeHtml)
        {
            MimeMessage email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_config["EmailSettings:Remitente"]));
            email.To.Add(MailboxAddress.Parse(destinatario));
            email.Subject = asunto;

            BodyBuilder builder = new BodyBuilder { HtmlBody = mensajeHtml };
            email.Body = builder.ToMessageBody();

            using SmtpClient smtp = new SmtpClient();

            smtp.ServerCertificateValidationCallback = (s, c, h, e) => true;

            await smtp.ConnectAsync(_config["EmailSettings:Servidor"], int.Parse(_config["EmailSettings:Puerto"]), false);
            await smtp.AuthenticateAsync(_config["EmailSettings:Usuario"], _config["EmailSettings:Password"]);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }
    }
}

