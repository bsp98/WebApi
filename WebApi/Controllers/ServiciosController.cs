using Domain.Dto;

using Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Services.Interfaces;

namespace WebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ServicioController:Controller
    {
        private readonly IServicioServicio _servicioServicio;

        public ServicioController(IServicioServicio servicioServicio)
        {
            _servicioServicio = servicioServicio;
        }




        [Authorize]
        [HttpPost()]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public IActionResult Post([FromBody] ServicioDto servicioDto)
        {
            //try
            //{
                //Se asignan los valores de descripcion para la validacion
                //servicioDto.MaxDesc = ExtraerValor("ParametersCabana:MaxDesc");
                //servicioDto.MinDesc = ExtraerValor("ParametersCabana:MinDesc");

                ServicioDto servicioIngresado = _servicioServicio.Add(servicioDto);

                return Ok(servicioIngresado);

            //}
            //catch (EntidadExistenteException eee)
            //{
            //    //409 cabana existente
            //    return Conflict(eee.Message);
            //}
            //catch (DatoIncorrectoException die)
            //{
            //    //( 422 entidad no procesable, rechazada por validacion de la entidad)
            //    return UnprocessableEntity(die.Message);
            //}

        }

    }


}
