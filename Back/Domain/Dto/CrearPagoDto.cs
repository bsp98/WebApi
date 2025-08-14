using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class CrearPagoDto
    {
        [Required]
        public string Titulo { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue)]
        public decimal Monto { get; set; }

        public string? CurrencyId { get; set; } = "UYU";

        public string? ExternalReference { get; set; }

        public string? SuccessUrl { get; set; }
        public string? FailureUrl { get; set; }
        public string? PendingUrl { get; set; }

        public CrearPagoDto() { }

        //public CrearPagoDto(string titulo, decimal monto, string? currencyId, string? externalReference, string? successUrl, string? failureUrl, string? pendingUrl)
        //{
        //    Titulo=titulo;
        //    Monto=monto;
        //    CurrencyId=currencyId;
        //    ExternalReference=externalReference;
        //    SuccessUrl=successUrl;
        //    FailureUrl=failureUrl;
        //    PendingUrl=pendingUrl;
        //}

       
    }
}
