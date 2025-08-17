using Services.Interfaces;
using MercadoPago.Client.Preference;
using MercadoPago.Resource.Preference;
using MercadoPago.Client.Payment;
using MercadoPago.Resource.Payment;
using MercadoPago.Client.MerchantOrder;
using MercadoPago.Resource.MerchantOrder;
using Domain.Dto;
using Domain.Models;
using Microsoft.Extensions.Configuration;
using DataAcces.Interfaces;
using MercadoPago.Client.Preference;   
using MercadoPago.Resource.Preference;

namespace Services.Services
{
    public class ServicioPago:IServicioPago
    {
        private readonly IRepositorioPago _repo;
        private readonly IConfiguration _cfg;

        public ServicioPago(IRepositorioPago repo, IConfiguration cfg)
        {
            _repo = repo; _cfg = cfg;
        }

        public async Task<CrearPreferenciaResultado> CrearPreferenciaAsync(CrearPagoDto dto)
        {
            var notificationUrl = _cfg["MercadoPago:NotificationUrl"];

            var request = new PreferenceRequest
            {
                Items = new List<PreferenceItemRequest>
            {
                new PreferenceItemRequest
                {
                    Title = dto.Titulo,
                    Quantity = 1,
                    UnitPrice = (decimal)dto.Monto,
                    CurrencyId = dto.CurrencyId ?? "UYU"
                }
            },
                ExternalReference = dto.ExternalReference ?? Guid.NewGuid().ToString(),
                BackUrls = new PreferenceBackUrlsRequest
                {
                    Success = dto.SuccessUrl  ?? "https://example.com/success",
                    Failure = dto.FailureUrl  ?? "https://example.com/failure",
                    Pending = dto.PendingUrl  ?? "https://example.com/pending"
                },
                AutoReturn = "approved",
                NotificationUrl = notificationUrl
            };

            var client = new PreferenceClient();
            Preference pref = await client.CreateAsync(request);

            var pago = new Pago
            {
                PreferenceId = pref.Id,
                ExternalReference = request.ExternalReference,
                Monto = dto.Monto,
                Moneda = dto.CurrencyId ?? "UYU",
                Status = "pending"
            };
            await _repo.AgregarAsync(pago);

            return new CrearPreferenciaResultado
            {
                PreferenceId = pref.Id,
                ExternalReference = request.ExternalReference!,
                //SACAR LO DE ABJO CUENTO ESTE FORNTEND
                InitPoint = pref.InitPoint,
                SandboxInitPoint = pref.SandboxInitPoint
            };

        }

        public Task<Pago?> ObtenerPorPrefAsync(string preferenceId) =>
            _repo.ObtenerPorPreferenceIdAsync(preferenceId);

        public async Task ProcesarWebhookAsync(string? type, long? dataId, long? idV1, string? topic)
        {

            if ((type == "payment" && dataId.HasValue) || (topic == "payment" && idV1.HasValue))
            {
                var paymentId = dataId ?? idV1;

                var payClient = new PaymentClient();
                var payment = await payClient.GetAsync(paymentId!.Value);

                string? preferenceId = null;
                string? externalRef = payment.ExternalReference; 

                if (payment.Order?.Id is long merchantOrderId)
                {
                    var moClient = new MerchantOrderClient();
                    var mo = await moClient.GetAsync(merchantOrderId);

                    preferenceId = mo.PreferenceId;               
                    if (string.IsNullOrWhiteSpace(externalRef))
                        externalRef = mo.ExternalReference;        
                }

                await ActualizarPagoAsync(preferenceId, externalRef, payment);
                return;
            }
        }





        private async Task ActualizarPagoAsync(string? preferenceId, string? externalRef, Payment? payment)
        {
            Pago? pago = null;
            if (!string.IsNullOrEmpty(preferenceId))
                pago = await _repo.ObtenerPorPreferenceIdAsync(preferenceId);
            if (pago is null && !string.IsNullOrEmpty(externalRef))
                pago = await _repo.ObtenerPorExternalRefAsync(externalRef);
            if (pago is null) return;

            if (payment is not null)
            {
                pago.PaymentId = payment.Id.ToString();
                pago.Status = payment.Status; // approved | rejected | pending | in_process
            }
            else
            {
                pago.Status = "pending";
            }
            pago.ActualizadoUtc = DateTime.UtcNow;

            await _repo.ActualizarAsync(pago);
        }

    }
}
