using Domain.Dto;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Exceptions;
using Domain.Exceptions;
using Services.Interfaces;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
        

        [AllowAnonymous]
        [HttpPost("cliente")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public IActionResult PostCliente([FromBody] ClienteDto dto)
        {
            try
            {
                var nuevo = _servicioUsuario.Add(dto); // método específico
                return Ok(nuevo);
            }
            catch (ExisteException e)
            {
                return Conflict(e.Message);
            }
            catch (DatoIncorrectoException e)
            {
                return UnprocessableEntity(e.Message);
            }
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
                _servicioUsuario.Remove(id);

                return Ok("Eliminado con exito");
            }
            catch (NoExisteException ne)
            {
                return NotFound(ne.Message);
            }
            catch (TipoEnUsoException tee)
            {
                return Conflict(tee.Message);
            }

        }


        [HttpPatch("desactivar/{id}")]
        public IActionResult Desactivar(int id)
        {
            _servicioUsuario.DesactivarCliente(id);
            return NoContent();
        }


        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult GetClientesPorNombre([FromQuery] string? nombre)
        {
            try
            {

                List<ClienteDto> clienteDto = _servicioUsuario.ObtenerTodos();

               if (!string.IsNullOrEmpty(nombre))
                 clienteDto = clienteDto.Where(u => u.Nombre.Contains(nombre, StringComparison.OrdinalIgnoreCase)).ToList();

                return Ok(clienteDto);
            }
            catch (NoExisteException ne)
            {
                return NotFound(ne.Message);
            }
        }


    }


}
