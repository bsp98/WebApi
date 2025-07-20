using AutoMapper;
using DataAccess.Interfaces;
using Domain.Dto;
using Domain.Models;
using Services.Interfaces;
using Services.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Dto.FiltrosDto;
using Services.Interfaces.CRUD;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;

namespace Services.Services
{
    public class ServicioAutenticacion : IServicioAutenticacion
    {
        private readonly IRepositorioUsuario _repositorioUsuario;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public ServicioAutenticacion(IRepositorioUsuario repositorioUsuario, IMapper mapper, IConfiguration configuration)
        {
            _repositorioUsuario = repositorioUsuario;
            _mapper = mapper;
            _configuration = configuration;
        }


        public UsuarioDto? Login(string email, string password)
        {
            Usuario? usuario = _repositorioUsuario.Login(email, password);

            if (usuario == null)
            {
                throw new NoExisteException("Las Credenciales no son validas");
            }

            if (usuario is Administrador admin)
                return _mapper.Map<AdministradorDto>(admin);
            else if (usuario is Cliente cliente)
                return _mapper.Map<ClienteDto>(cliente);
            else
                throw new NoExisteException("Tipo de usuario desconocido");
        }


        public string GenerarTokenJwt(string emailUsuario, string nombreUsuario, string rol,int id)

        {

            var claveSecreta = _configuration["ClaveSecreta:Clave"];
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,id.ToString()),
                new Claim(ClaimTypes.Email,emailUsuario),
                new Claim(ClaimTypes.Name,nombreUsuario),
                new Claim(ClaimTypes.Role, rol),


            };

            var clave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(claveSecreta));

            var token = new JwtSecurityToken(
                issuer: "https://servidor_seguridad",
                audience: "https://servidor_protegido",
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: new SigningCredentials(clave, SecurityAlgorithms.HmacSha256)
            );

            string tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return tokenString;
        }


    }
}
