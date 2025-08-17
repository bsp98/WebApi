using Domain.Dto;
using Domain.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiftCardController : Controller
    {
        private readonly IServicioGiftCard _servicioGiftcard;

        public GiftCardController(IServicioGiftCard servicioGiftcard)
        {
            _servicioGiftcard=servicioGiftcard;
        }


        [HttpPost("solicitar")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task<IActionResult> Solicitar([FromBody] GiftCardDto dto)
        {
            try
            {
                await _servicioGiftcard.EnviarSolicitudAsync(dto);
                return Ok("Solicitud Enviada!");
            }
            catch (DatoIncorrectoException die)
            {
                return UnprocessableEntity(die.Message);
            }
        }
    }
}
