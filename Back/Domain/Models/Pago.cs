using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Pago
    {
        public int Id { get; set; }
        public string PreferenceId { get; set; } = default!;
        public string? ExternalReference { get; set; }  // tu OrderId interno si querés
        public string? PaymentId { get; set; }
        public string Status { get; set; } = "pending"; // approved | rejected | pending | in_process
        public decimal Monto { get; set; }
        public string Moneda { get; set; } = "UYU";
        public DateTime CreadoUtc { get; set; } = DateTime.UtcNow;
        public DateTime? ActualizadoUtc { get; set; }


    }
}
//PROBANDOOOOOOOO CON ESTA COSASASS