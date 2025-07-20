using Domain.Dto;
using Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Exceptions;
using Domain.Exceptions;
using Services.Interfaces;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Domain.Dto.FiltrosDto;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WebApi.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : Controller
    {
        private readonly IServicioUsuario _servicioUsuario;
        

        public UsuarioController(IServicioUsuario servicioUsuario)
        {
            _servicioUsuario = servicioUsuario;
            
        }


        [Authorize]
        [HttpPost("cliente")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
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
            catch (NoExisteException eee) {
                return Unauthorized(eee.Message);
            }
        }


        //[Authorize]
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
            catch (TieneReservas tee)
            {
                return Conflict(tee.Message);
            }

        }



        //[Authorize]
        [HttpPatch("desactivar/{id}")]
        public IActionResult Desactivar(int id)
        {
            try
            {
                _servicioUsuario.DesactivarCliente(id);

                return Ok("desactivado con exito");

            }
            catch (NoExisteException ne)
            {
                return NotFound(ne.Message);
            }
            catch(UsuarioNoCliente e) {

                return UnprocessableEntity(e.Message);
            }
          
        }


        //[Authorize]
        [HttpGet("Filtrar")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult GetClientesPorFiltro([FromQuery] ClienteFiltrosDto filtros)
        {


            List<ClienteDto> clienteDto = _servicioUsuario.FiltrarClientes(filtros);

                return Ok(clienteDto);
       
        }

        [Authorize(Roles="Administrador")]
        //[AllowAnonymous]
        [HttpGet("GetTodos")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult GetAll()
        {
            try
            {

                List<ClienteDto> clienteDto = _servicioUsuario.ObtenerTodos();

                return Ok(clienteDto);
            }
            catch (NoExisteException ne)
            {
                return NotFound(ne.Message);
            }
        }
        
        [Authorize(Roles = "Cliente")]
        //[AllowAnonymous]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetById(int id)
        {
            try
            {

                UsuarioDto usuarioDto = _servicioUsuario.GetById(id);
                return Ok(usuarioDto);
            }
            catch (NoExisteException ne)
            {
                return NotFound(ne.Message);
            }
            catch (Exception e) { 
                return BadRequest(e.Message);
            }

        }


        [HttpGet("Paginado")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult GetClientesPaginados([FromQuery]int page = 1, [FromQuery]int pageSize = 10)
        {
            try
            {
                var (clientes, total) = _servicioUsuario.ObtenerClientesPaginados(page, pageSize);

                return Ok(new
                {
                    data = clientes,
                    totalItems = total
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error interno del servidor");
            }
        }

       

    }


}
