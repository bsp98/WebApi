

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MercadoPago.Client.Preference;
using MercadoPago.Resource.Preference;
using MercadoPago.Client.Payment;
using MercadoPago.Resource.Payment;
using MercadoPago.Client.MerchantOrder;
using MercadoPago.Resource.MerchantOrder;
using Services.Interfaces;
using Domain.Dto;
using Domain.Models;
using Microsoft.Extensions.Logging;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PagoController : Controller
    {
        private readonly IServicioPago _servicioPago;
        private readonly ILogger<PagoController> _logger;

        public PagoController(IServicioPago servicioPago, ILogger<PagoController> logger)
        {
            _servicioPago = servicioPago;
            _logger=logger;
        }

        //[HttpPost("preferencias")]
        //public async Task<IActionResult> CrearPreferencia([FromBody] CrearPagoDto dto)
        //{
        //    var r = await _servicioPago.CrearPreferenciaAsync(dto);
        //    return Ok(new { preferenceId = r.PreferenceId, externalReference = r.ExternalReference });
        //}


        //DEJA REL COMENTADO CUANDO ESTE E; FRONTEND
        [HttpPost("preferencias")]
        public async Task<IActionResult> CrearPreferencia([FromBody] CrearPagoDto dto)
        {
            try
            {
                var r = await _servicioPago.CrearPreferenciaAsync(dto);
                return Ok(r);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creando preferencia MP");
                return Problem("No se pudo crear la preferencia de pago.");
            }
        }


        [HttpGet("{preferenceId}")]
        public async Task<IActionResult> ObtenerPorPref(string preferenceId)
        {
            var pago = await _servicioPago.ObtenerPorPrefAsync(preferenceId);
            return pago is null ? NotFound() : Ok(pago);
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> Webhook(
            [FromQuery] string? type,
            [FromQuery] long? data_id,
            [FromQuery(Name = "id")] long? idV1,
            [FromQuery(Name = "topic")] string? topic)
        {


            _logger.LogInformation(
                "Webhook MP recibido. type={type}, dataId={dataId}, topic={topic}, idV1={idV1}",
                type, data_id, topic, idV1);
            try
            {
                await _servicioPago.ProcesarWebhookAsync(type, data_id, idV1, topic);
              
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error procesando webhook MP");
                // devolvé 200 igual para que MP no te bombardee con reintentos infinitos
            }
            return Ok();

        }
    }
}
