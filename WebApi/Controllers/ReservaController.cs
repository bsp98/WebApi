using Domain.Dto;
using Domain.Dto.FiltrosDto;
using Domain.Exceptions;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Exceptions;
using Services.Interfaces;
using Services.Services;

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

        [AllowAnonymous]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Put(int id, [FromBody] ReservaDto reservaDto)
        {
            try
            {
               
                _servicioReserva.Update(id, reservaDto);

                return Ok("Modificado con exito");
            }
            catch (DatoIncorrectoException die)
            {
                return UnprocessableEntity(die.Message);
            }
            catch (NoExisteException ene)
            {
                return NotFound(ene.Message);
            }

        }



        [AllowAnonymous]
        [HttpGet("Filtrar")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult GetReservasPorFiltro([FromQuery] ReservaFiltroDto filtros)
        {


            List<ReservaDto> reservasDto = _servicioReserva.FiltrarReservas(filtros);

            return Ok(reservasDto);

        }
    }
}
