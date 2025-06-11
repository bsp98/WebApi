using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Reserva
    {
        public int Id { get; set; }
        public double PrecioTotal { get; set; }
        public DateTime Fecha { get; set; }
        public Cliente Cliente { get; set; }
        public List<Servicio> Servicios { get; set; }
        
        //public EstadoDePAGO EstadoPago;
        public Boolean Cancelada { get; set; }

        public Reserva( double precioTotal, DateTime fecha, Cliente cliente, List<Servicio> servicios)
        {
    
            PrecioTotal=precioTotal;
            Fecha=fecha;
            Cliente=cliente;
            Servicios=servicios;
            Cancelada=false;
        }

        public Reserva() { }

        public string ObtenerNombreCliente() {
            return Cliente.Nombre;
        }


        public void CancelarReserva() { 
            this.Cancelada = true;
            EnviarNotificacion();
        }

        private void EnviarNotificacion()
        {
            throw new NotImplementedException();
        }
    }
}
