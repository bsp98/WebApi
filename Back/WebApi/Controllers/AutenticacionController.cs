using Azure.Core;
using Domain.Dto;
using Domain.Models;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Services.Exceptions;
using Services.Interfaces;


namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutenticacionController : Controller
    {

        private readonly IServicioAutenticacion _servicioAutenticacion;
        private readonly IServicioUsuario _servicioUsuario;


        public AutenticacionController(IServicioAutenticacion servicioAutenticacion, IServicioUsuario servicioUsuario)
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
                /*
                 -Ver el registro del login google
                -probar con el diploy
                 */


                UsuarioDto usuario = _servicioAutenticacion.Login(loginDto.Email, loginDto.Password);


                string tokenJwt = _servicioAutenticacion.GenerarTokenJwt(usuario.Email, usuario.Nombre, usuario.NombreTipoUsuario, usuario.Id);

                Response.Cookies.Append("jwt", tokenJwt, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = false,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTimeOffset.UtcNow.AddHours(1)
                });



                return Ok(new
                {
                    idUsuario = usuario.Id,
                    rolUsuario = usuario.NombreTipoUsuario
                });
            }

            catch (NoExisteException eee)
            {
                //Codigo Status 401 no autorizado
                return Unauthorized(eee.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost("GoogleLogin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginDto dto)
        {
            try
            {
                var (usuario, tokenJwt) = await _servicioAutenticacion.GoogleLoginAsync(dto.IdToken);

                Response.Cookies.Append("jwt", tokenJwt, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = false,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTimeOffset.UtcNow.AddHours(1)
                });

                return Ok(new
                {
                    idUsuario = usuario.Id,
                    rolUsuario = usuario.NombreTipoUsuario,
                });
            }
            catch (NoExisteException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
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

    }
}
