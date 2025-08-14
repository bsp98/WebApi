using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class CrearPreferenciaResultado
    {
        public string PreferenceId { get; set; } = default!;
        public string ExternalReference { get; set; } = default!;


        //CUAND ESTE EL FRONEND SACAR LO DE ABAJO 
        public string? InitPoint { get; set; }           // link “real”
        public string? SandboxInitPoint { get; set; }     // link de pruebas

    }
}
