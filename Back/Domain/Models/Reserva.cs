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

        public Cliente? Cliente { get; set; }
        public int? ClienteId { get; set; }
        public string? NombreCliente { get; set; }
        public string? ApellidoCliente { get; set; }
        public string? EmailCliente { get; set; }
        public string? CelularCliente { get; set; }


        public Servicio Servicio { get; set; }
        public int ServicioId { get; set; }
        public TimeSpan HoraInicio { get; set; }
        public TimeSpan HoraFin { get; set; }
        public Boolean Cancelada { get; set; }

        //Constructor cuando te llega un ClienteId
        public Reserva( DateTime fecha, TimeSpan horaInicio, Cliente cliente, Servicio servicio)
        {

            Fecha=fecha;
            Cliente=cliente;
            ClienteId = cliente.Id;
            Servicio= servicio;
            PrecioTotal = CalcularPrecio();
            Cancelada=false;
            HoraInicio = horaInicio; 
            HoraFin = HoraInicio.Add(TimeSpan.FromMinutes(Servicio.TiempoDeDuracionMin)); 
        }

        //Constructor sin cllienteID
        public Reserva(DateTime fecha, TimeSpan horaInicio,string nombreCliente, string apellidoCliente, string emailCliente, string celularCliente, Servicio servicio)
        {
            Fecha = fecha;
            NombreCliente = nombreCliente;
            ApellidoCliente = apellidoCliente;
            EmailCliente = emailCliente;
            CelularCliente = celularCliente;
            Servicio = servicio;
            PrecioTotal = CalcularPrecio();
            Cancelada = false;
            HoraInicio = horaInicio;
            HoraFin = HoraInicio.Add(TimeSpan.FromMinutes(Servicio.TiempoDeDuracionMin));
        }
        private double CalcularPrecio()
        {
            return Servicio.ObtenerPrecio();
        }

        public Reserva() { }


        public string? ObtenerNombreCliente() {
            return Cliente?.Nombre;
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
