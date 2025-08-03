using AutoMapper;
using DataAcces.Repositories;
using DataAccess.Interfaces;
using Domain.Dto;
using Domain.Dto.FiltrosDto;
using Domain.Models;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Services.Exceptions;
using Services.Interfaces;
using Services.Interfaces.CRUD;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class ServicioAutenticacion : IServicioAutenticacion
    {
        private readonly IRepositorioUsuario _repositorioUsuario;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IServicioUsuario _servicioUsuario;
        public ServicioAutenticacion(IRepositorioUsuario repositorioUsuario, IMapper mapper, IConfiguration configuration, IHttpContextAccessor httpContextAccessor, IServicioUsuario servicioUsuario)
        {
            _repositorioUsuario = repositorioUsuario;
            _mapper = mapper;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
            _servicioUsuario = servicioUsuario;
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


        public string GenerarTokenJwt(string emailUsuario, string nombreUsuario, string rol, int id)

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



        public async Task<(UsuarioDto usuario, string tokenJwt)> GoogleLoginAsync(string idToken)
        {
            // Validar el token ID de Google recibido desde el frontend
            var payload = await GoogleJsonWebSignature.ValidateAsync(idToken);
            string email = payload.Email;

            var usuarioEncontrado = _servicioUsuario.ObtenerPorEmail(email);

            string nombreApellido = payload.Name;
            string[] partes = nombreApellido.Split(' '); // Divide el texto por espacio

            string nombre = partes[0];
            string apellido = partes.Length > 1 ? partes[1] : "";

            if (usuarioEncontrado == null)
            {
                ClienteGoogleDto nuevoCliente = new ClienteGoogleDto(email, nombre, apellido);
                usuarioEncontrado = _servicioUsuario.Add(nuevoCliente);
            }

            string tokenJwt = GenerarTokenJwt(usuarioEncontrado.Email, usuarioEncontrado.Nombre, usuarioEncontrado.TipoUsuario.ToString(), usuarioEncontrado.Id);

            return (usuarioEncontrado, tokenJwt);
        }

    }
}
