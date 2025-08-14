

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

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PagoController : Controller
    {
        private readonly IServicioPago _servicioPago;

        public PagoController(IServicioPago servicioPago)
        {
            _servicioPago = servicioPago;
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
            try { await _servicioPago.ProcesarWebhookAsync(type, data_id, idV1, topic); }
            catch { /* loggear si querés */ }
            // devolver 200 siempre para evitar loops de reintentos
            return Ok();
        }
    }
}
