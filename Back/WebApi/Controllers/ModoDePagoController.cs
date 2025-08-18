using Azure.Core;
using Domain.Dto;
using Domain.Exceptions;
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
    public class ModoDePagoController : Controller
    {
        private readonly IServicioModoDePago _servicioModoDePago;

        public ModoDePagoController(IServicioModoDePago servicioModoDePago)
        {
            _servicioModoDePago = servicioModoDePago;
        }


        //[Authorize]
        [HttpPost("CambiarModo")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public IActionResult CambiarModo(ModificarInterfazPagoDto dto)
        {
            try
            {
            ModificarInterfazPagoDto dtoADevolver =  _servicioModoDePago.CambiarTipoDePago(dto);
            return Ok(dtoADevolver);

            }catch (DatoIncorrectoException ex) 
            {
                return UnprocessableEntity(ex);
            }
        }

        [HttpGet("ObtenerModo")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public IActionResult ObtenerModo()
        {
            try
            {
                ModificarInterfazPagoDto dtoADevolver = _servicioModoDePago.ObtenerModoDePago();
                return Ok(dtoADevolver);

            }
            catch (DatoIncorrectoException ex)
            {
                return UnprocessableEntity(ex);
            }
        }
    }
}
