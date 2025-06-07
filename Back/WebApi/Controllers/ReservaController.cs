using Domain.Dto;
using Domain.Exceptions;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Exceptions;
using Services.Interfaces;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservaController : Controller
    {
        private readonly IServicioReserva _servicioReserva;

        public ReservaController(IServicioReserva servicioReserva)
        {
            _servicioReserva = servicioReserva;
        }


        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult GetAll()
        {
            List<ReservaDto> r = _servicioReserva.ObtenerTodos();
            return Ok(r);
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult Delete(int id)
        {
            try
            {
                _servicioReserva.Remove(id);

                return Ok("Eliminado con exito");
            }
            catch (NoExisteException ene)
            {
                return NotFound(ene.Message);
            }
       
        }

        [AllowAnonymous]
        [HttpPost()]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public IActionResult Post([FromBody] ReservaDto reservaDto)
        {
            try
            {
                ReservaDto r = _servicioReserva.Add(reservaDto);

                return Ok(r);

            }
            catch (ExisteException eee)
            {
                return Conflict(eee.Message);
            }
            catch (DatoIncorrectoException die)
            {
                return UnprocessableEntity(die.Message);
            }

        }


        [HttpGet("index")]
        public IActionResult Index()
        {
            return View();
        }
    }
}
