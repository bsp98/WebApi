using AutoMapper;
using DataAccess.Interfaces;
using Microsoft.Extensions.Configuration;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Services.Interfaces;
using Domain.Dto;

namespace Services.Services
{
    public class ServicioContacto : IServicioContacto
    {
        private readonly IServicioEmail _servicioEmail;
        private readonly IConfiguration _config;
        public ServicioContacto(IServicioEmail servicioEmail, IConfiguration config)
        {
            
            _servicioEmail = servicioEmail;
            _config = config;
        }

        public async Task EnviarEmailContacto(MensajeDeContactoDto dto)
        {
            dto.Validar();
            string emailAdmin = _config["EmailSettings:Admin"] ?? _config["EmailSettings:Remitente"];
            string cuerpo = $"<p>Hola mi nombre es {dto.Nombre} {dto.Apellido} <br> Email: {dto.Email} - Telefono: {dto.Telefono} <br><strong>Mensaje:</strong> {dto.Mensaje}</p>";
            await _servicioEmail.EnviarEmailAsync(emailAdmin, "Mensaje de contacto", cuerpo);
        }

       
    }
}
