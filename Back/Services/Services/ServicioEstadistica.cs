using DataAcces.Interfaces;
using Domain.Dto;
using Domain.Models;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class ServicioEstadstica : IServicioEstadistica
    {
        private readonly IRepositorioReserva _repositorioReserva;
        private readonly IRepositorioEgreso _repositorioEgreso;

        public ServicioEstadstica(IRepositorioReserva repositorioReserva, IRepositorioEgreso repositorioEgreso)
        {
            _repositorioReserva=repositorioReserva;
            _repositorioEgreso=repositorioEgreso;
        }

        public GeneralEstadisticaDto ObtenerResumenGeneral()
        {
            IEnumerable<Reserva> reservas = _repositorioReserva.GetAll(); // incluye servicios, fecha y precio?

            IEnumerable<Egreso> egresos = _repositorioEgreso.GetAll();

            double ingresosTotales = 0;
            foreach (Reserva r in reservas)
            {
                ingresosTotales += r.Servicio.Precio;
            }


            double egresosTotales = 0;
            foreach (Egreso e in egresos)
            {
                egresosTotales += e.Monto;
            }

            List<BalanceMensualDto> balances = new List<BalanceMensualDto>();

            Dictionary<(int anio, int mes), List<Reserva>> reservasAgrupadas = new Dictionary<(int, int), List<Reserva>>();

            foreach (Reserva r in reservas)
            {
                int anio = r.Fecha.Year;
                int mes = r.Fecha.Month;
                (int, int) clave = (anio, mes);

                if (!reservasAgrupadas.ContainsKey(clave))
                {
                    reservasAgrupadas[clave] = new List<Reserva>();
                }

                reservasAgrupadas[clave].Add(r);
            }

            foreach (KeyValuePair<(int anio, int mes), List<Reserva>> grupo in reservasAgrupadas)
            {
                int anio = grupo.Key.anio;
                int mes = grupo.Key.mes;
                List<Reserva> reservasMes = grupo.Value;

                double ingresosMes = 0;
                foreach (Reserva r in reservasMes)
                {
                    ingresosMes += r.Servicio.Precio;
                }

                double egresosMes = 0;
                foreach (Egreso e in egresos)
                {
                    if (e.Fecha.Year == anio && e.Fecha.Month == mes)
                    {
                        egresosMes += e.Monto;
                    }
                }

                BalanceMensualDto balance = new BalanceMensualDto();
                balance.Anio = anio;
                balance.Mes = mes;
                balance.Ingresos = ingresosMes;
                balance.Egresos = egresosMes;

                balances.Add(balance);
            }

            int totalReservas = reservas.Count();

            Dictionary<string, List<Reserva>> reservasPorServicio = new Dictionary<string, List<Reserva>>();
            foreach (Reserva r in reservas)
            {
                string nombreServicio = r.Servicio.Nombre;

                if (!reservasPorServicio.ContainsKey(nombreServicio))
                {
                    reservasPorServicio[nombreServicio] = new List<Reserva>();
                }

                reservasPorServicio[nombreServicio].Add(r);
            }

            List<EstadisticaServicioDto> estadisticasServicios = new List<EstadisticaServicioDto>();

            foreach (KeyValuePair<string, List<Reserva>> grupo in reservasPorServicio)
            {
                string nombre = grupo.Key;
                List<Reserva> reservasServicio = grupo.Value;
                Reserva primeraReserva = reservasServicio.First();

                EstadisticaServicioDto estadistica = new EstadisticaServicioDto();
                estadistica.Nombre = nombre;
                estadistica.Categoria = primeraReserva.Servicio.Categoria;
                estadistica.Precio = primeraReserva.Servicio.Precio;
                estadistica.Porcentaje = Math.Round((double)reservasServicio.Count / totalReservas * 100, 2);
                estadistica.Ganancia = 0;

                foreach (Reserva r in reservasServicio)
                {
                    estadistica.Ganancia += r.Servicio.Precio;
                }

                estadisticasServicios.Add(estadistica);
            }

            GeneralEstadisticaDto resultado = new GeneralEstadisticaDto();
            resultado.TotalIngresos = ingresosTotales;
            resultado.TotalEgresos = egresosTotales;
            resultado.BalancesMensuales = balances;
            resultado.EstadisticasServicios = estadisticasServicios;

            return resultado;
        }
    }
    
    
}
