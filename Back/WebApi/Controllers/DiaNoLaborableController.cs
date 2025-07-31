using Domain.Dto;
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
    public class DiaNoLaborableController : Controller
    {
        private readonly IServicioDiaNoLaborable _servicioDiaNoLaborable;


        public DiaNoLaborableController(IServicioDiaNoLaborable servicioDiaNoLaborable)
        {
            _servicioDiaNoLaborable = servicioDiaNoLaborable;
        }

        
        [Authorize(Roles = "Administrador")]
        [HttpPost("Agregar")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public IActionResult Post([FromBody] DiaNoLaborableDto diaNoLaborableDto)
        {
            try
            {
                DiaNoLaborableDto diaNoLaborable = _servicioDiaNoLaborable.Add(diaNoLaborableDto);

                return Ok(diaNoLaborable);

            }
            catch (ExisteException ee)
            {

                return Conflict(ee.Message);
            }
            catch (DatoIncorrectoException die)
            {

                return UnprocessableEntity(die.Message);
            }

        }


       
        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrador")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult Delete(int id)
        {
            try
            {
                _servicioDiaNoLaborable.Remove(id);

                return Ok("Eliminado con exito");
            }
            catch (NoExisteException ene)
            {
                return NotFound(ene.Message);
            }

        }



        [Authorize(Roles = "Administrador")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult GetAll()
        {
            List<DiaNoLaborableDto> diaNoLaborableDto = _servicioDiaNoLaborable.GetAll();
            return Ok(diaNoLaborableDto);
        }

    }
}
