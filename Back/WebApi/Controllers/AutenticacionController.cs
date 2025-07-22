using Domain.Dto;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Exceptions;
using Services.Interfaces;
using Google.Apis.Auth;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;


namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutenticacionController : Controller
    {

        private readonly IServicioAutenticacion _servicioAutenticacion;
        private readonly IServicioUsuario _servicioUsuario;


        public AutenticacionController(IServicioAutenticacion servicioAutenticacion,IServicioUsuario servicioUsuario)
        {
            _servicioAutenticacion = servicioAutenticacion;
            _servicioUsuario = servicioUsuario;


        }


        [AllowAnonymous]
        [HttpPost("Login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            try
            {


                UsuarioDto usuario = _servicioAutenticacion.Login(loginDto.Email, loginDto.Password);
                //Creo el token jwt
                string rol = usuario.Tipo.ToString();


                string tokenJwt = _servicioAutenticacion.GenerarTokenJwt(usuario.Email, usuario.Nombre, rol, usuario.Id);

                Response.Cookies.Append("jwt", tokenJwt, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTimeOffset.UtcNow.AddHours(1)
                });



                return Ok("Login exitoso");
            }

            catch (NoExisteException eee)
            {
                //Codigo Status 401 no autorizado
                return Unauthorized(eee.Message);
            }
        }

        //[AllowAnonymous]
        //[HttpPost("Login")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status401Unauthorized)]
        //public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        //{
        //    try
        //    {
        //        // Validar credenciales y obtener usuario
        //        UsuarioDto usuario = _servicioAutenticacion.Login(loginDto.Email, loginDto.Password);

        //        // Generar la cookie de autenticación
        //        await _servicioAutenticacion.GenerarCookieDeAutenticacion(usuario);

        //        return Ok("Login exitoso");
        //    }
        //    catch (NoExisteException ex)
        //    {
        //        return Unauthorized(ex.Message);
        //    }
        //}

        //[AllowAnonymous]
        //[HttpPost("GoogleLogin")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status401Unauthorized)]
        //public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginDto dto)
        //{
        //    try
        //    {
        //        // Validar el token ID de Google
        //        var payload = await GoogleJsonWebSignature.ValidateAsync(dto.IdToken);

        //        // Buscar usuario por email
        //        var usuario = _servicioUsuario.ObtenerPorEmail(payload.Email);

        //        if (usuario == null)
        //        {
        //            // Crear nuevo usuario
        //            usuario = new ClienteDto
        //            {
        //                Email = payload.Email,
        //                Nombre = payload.Name,
        //                Tipo = 0 // o el rol que corresponda
        //            };
        //            _servicioUsuario.Add(usuario);
        //        }

        //        // Generar la cookie de autenticación usando el servicio
        //        await _servicioAutenticacion.GenerarCookieDeAutenticacion(usuario);

        //        return Ok("Login exitoso");
        //    }
        //    catch (NoExisteException ex)
        //    {
        //        return Unauthorized(ex.Message);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Opcional: capturar otros errores y devolver mensaje genérico
        //        return BadRequest("Error en autenticación con Google.");
        //    }
        //}

        [AllowAnonymous]
        [HttpPost("GoogleLogin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginDto dto)
        {
            try
            {
                // Validar el token ID de Google recibido desde el frontend
                var payload = await GoogleJsonWebSignature.ValidateAsync(dto.IdToken);

                // Buscar usuario en la base por email
                var usuario = _servicioUsuario.ObtenerPorEmail(payload.Email);

                if (usuario == null)
                {
                    // Si no existe, crear nuevo usuario
                    usuario = new ClienteDto();
                    {
                        usuario.Email = payload.Email;
                        usuario.Nombre = payload.Name;
                        usuario.Tipo = 0;
                        // Asignar otros campos si querés, como imagen, etc.
                    };
                    _servicioUsuario.Add(usuario);
                }

                // Obtener rol o asignar uno por defecto
                string rol = usuario.Tipo.ToString();

                // Generar tu JWT local

                string tokenJwt = _servicioAutenticacion.GenerarTokenJwt(usuario.Email, usuario.Nombre, rol, usuario.Id);

                Response.Cookies.Append("jwt", tokenJwt, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTimeOffset.UtcNow.AddHours(1)
                });

                return Ok("Login exitoso");
            }
            catch (NoExisteException ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [Authorize]
        [HttpPost("Logout")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok("Sesión cerrada correctamente.");
        }

        //[Authorize]
        //[HttpPost("Logout")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public async Task<IActionResult> Logout()
        //{
        //    await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        //    return Ok("Sesión cerrada correctamente.");
        //}
    }
}
