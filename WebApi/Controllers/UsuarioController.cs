using Domain.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Exceptions;
using Domain.Exceptions;
using Services.Interfaces;

namespace WebApi.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : Controller
    {
        private readonly IServicioUsuario _servicioUsuario;
        private readonly IConfiguration _configuration;

        public UsuarioController(IServicioUsuario servicioUsuario, IConfiguration configuration)
        {
            _servicioUsuario = servicioUsuario;
            _configuration = configuration;
        }

        [Authorize]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public IActionResult Post([FromBody] UsuarioDto usuarioDto)
        {
            try
            {
                UsuarioDto usuNuevo = _servicioUsuario.Add(usuarioDto);

                return Ok(usuNuevo);

            }
            catch (ExisteException e)
            {
                //409 tipo existenete
                return Conflict(e.Message);
            }
            catch (DatoIncorrectoException die)
            {
                //( 422 entidad no procesable, rechazada por validacion de la entidad)
                return UnprocessableEntity(die.Message);
            }
           

        }




    }
}
