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
using Domain;
using Services.Services;

namespace WebApi.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : Controller
    {
        private readonly IServicioUsuario _servicioUsuario;
        private readonly IServicioEmail _servicioEmail;

        public UsuarioController(IServicioUsuario servicioUsuario, IServicioEmail servicioEmail)
        {
            _servicioUsuario = servicioUsuario;
            _servicioEmail=servicioEmail;
        }


        [AllowAnonymous]
        [HttpPost("Registro")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult PostCliente([FromBody] ClienteDto dto)
        {
            try
            {
                var nuevo = _servicioUsuario.Add(dto); // método específico
                return Ok("Registro realizado con exito");
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
                return NotFound(eee.Message);
            }
        }

        [Authorize] 
        [HttpPatch("cambiar-password")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult CambiarPasswordPerfil([FromBody] CambiarPasswordDto dto)
        {
            try
            {
                dto.Validar();
                string email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
               // Console.WriteLine("EMAIL DEL USUARIO AUTENTICADO: " + email);
                _servicioUsuario.CambiarPasswordPerfil(email, dto.PasswordActual, dto.NuevaPassword);
                return Ok("Contraseña actualizada correctamente.");
            }
            catch (DatoIncorrectoException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (NoExisteException ex)
            {
                return NotFound(ex.Message);
            }
        }


        [AllowAnonymous]
        [HttpPatch("olvido-password")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult OlvidoPassword([FromBody] OlvidoPasswordDto dto)
        {
            try
            {
                dto.Validar();
                _servicioUsuario.ConfirmarRecuperacionContrasenia(dto.Email, dto.Codigo, dto.NuevaPassword);
                return Ok("Contraseña cambiada correctamente.");
            }
            catch (NoExisteException ex)
            {
                return NotFound(ex.Message);
            }
            catch (DatoIncorrectoException e)
            {
                return UnprocessableEntity(e.Message);
            }
        }





        [AllowAnonymous]
        [HttpPost("solicitar-codigo")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> EnviarCodigo([FromBody] SolicitudRecuperacionDto dto)
        {
            try
            {
                await _servicioUsuario.EnviarCodigoRecuperacionAsync(dto.Email);
                return Ok("Código enviado por email.");
            }
            catch (NoExisteException ex)
            {
                return NotFound(ex.Message);
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



        [Authorize(Roles = "Administrador")]
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


        [Authorize(Roles = "Administrador")]
        [HttpGet("Filtrar")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult GetClientesPorFiltro([FromQuery] ClienteFiltrosDto filtros)
        {


            List<ClienteDto> clienteDto = _servicioUsuario.FiltrarClientes(filtros);

                return Ok(clienteDto);
       
        }

        [Authorize(Roles="Administrador")]
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
        //////////////////////////////////////////
        //[Authorize(Roles = "Administrador,Cliente")]
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
