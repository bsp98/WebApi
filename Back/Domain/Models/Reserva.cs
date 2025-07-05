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
        public Servicio Servicio { get; set; }
        public int ServicioId { get; set; }
        public int ClienteId { get; set; }
        public TimeSpan HoraInicio { get; set; }
        public TimeSpan HoraFin { get; set; }

        //public EstadoDePAGO EstadoPago;
        public Boolean Cancelada { get; set; }

        public Reserva( DateTime fecha, Cliente cliente, Servicio servicio)
        {

            Fecha=fecha;
            Cliente=cliente;
            Servicio= servicio;
            PrecioTotal = CalcularPrecio();
            Cancelada=false;
            HoraInicio = Fecha.TimeOfDay; 
            HoraFin = HoraInicio.Add(TimeSpan.FromMinutes(Servicio.TiempoDeDuracionMin)); 
        }

        private double CalcularPrecio()
        {
            return Servicio.ObtenerPrecio();
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

        public string ObtenerNombreServicio() {
            return Servicio.Nombre;
        }
    }
}
