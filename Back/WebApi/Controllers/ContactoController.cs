using Domain.Dto;
using Domain.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Services.Exceptions;
using Services.Interfaces;
using Services.Services;

namespace WebApi.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactoController : Controller
    {
        private readonly IServicioContacto _servicioContacto;

        public ContactoController(IServicioContacto servicioContacto)
        {
            _servicioContacto = servicioContacto;
        }

        [AllowAnonymous]
        [HttpPost("Mensaje")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task <IActionResult> EnviarMensaje([FromBody] MensajeDeContactoDto mensajeDto)
        {
            try
            {

               await _servicioContacto.EnviarEmailContacto(mensajeDto);


                return Ok();
            }

            catch (DatoIncorrectoException die)
            {
                //Codigo Status 401 no autorizado
                return UnprocessableEntity(die.Message);
            }
        }
    }
}
