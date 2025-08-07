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

        public GeneralEstadisticaDto ObtenerResumenGeneral(int? anioFiltro = null)
        {
            int mesActual = DateTime.Now.Month;
            int anioActual = DateTime.Now.Year;
            int anioConsulta = anioFiltro ?? anioActual;

            double ingresosTotales = CalcularIngresosDelMes(mesActual, anioActual);
            double egresosTotales = CalcularEgresosDelMes(mesActual, anioActual);

            List<BalanceMensualDto> balances = CalcularBalancesMensuales(anioConsulta);
            List<EstadisticaServicioDto> estadisticasServicios = CalcularEstadisticasServicios(anioConsulta);

            return new GeneralEstadisticaDto
            {
                TotalIngresos = ingresosTotales,
                TotalEgresos = egresosTotales,
                BalancesMensuales = balances,
                EstadisticasServicios = estadisticasServicios
            };
        }

        private double CalcularIngresosDelMes(int mes, int anio)
        {
            IEnumerable<Reserva> reservas = _repositorioReserva.GetPorMesYAnio(mes, anio);
            return reservas.Sum(r => r.PrecioTotal);
        }

        private double CalcularEgresosDelMes(int mes, int anio)
        {
            IEnumerable<Egreso> egresos = _repositorioEgreso.GetPorMesYAnio(mes, anio);
            return egresos.Sum(e => e.Monto);
        }

        private List<BalanceMensualDto> CalcularBalancesMensuales( int anio)
        {
            List<Reserva> reservasFiltradas = _repositorioReserva.GetPorAnio(anio).ToList();
            List<Egreso> egresosFiltrados = _repositorioEgreso.GetPorAnio(anio).ToList();


            var reservasAgrupadas = reservasFiltradas.GroupBy(r => r.Fecha.Month);

            List<BalanceMensualDto> balances = new List<BalanceMensualDto>();

            foreach (var grupo in reservasAgrupadas)
            {
                int mes = grupo.Key;
                double ingresos = grupo.Sum(r => r.PrecioTotal);
                double egresosMes = egresosFiltrados.Where(e => e.Fecha.Month == mes).Sum(e => e.Monto);

                BalanceMensualDto balance = new BalanceMensualDto
                {
                    Anio = anio,
                    Mes = mes,
                    Ingresos = ingresos,
                    Egresos = egresosMes,
                    Balance = ingresos - egresosMes
                };

                balances.Add(balance);
            }

            return balances;
        }

        private List<EstadisticaServicioDto> CalcularEstadisticasServicios(int anio)
        {
            List<Reserva> reservasFiltradas = _repositorioReserva.GetPorAnio(anio).ToList();
            int total = reservasFiltradas.Count;

            var agrupadas = reservasFiltradas.GroupBy(r => r.Servicio.Nombre);

            List<EstadisticaServicioDto> estadisticas = new List<EstadisticaServicioDto>();

            foreach (var grupo in agrupadas)
            {
                var primera = grupo.First();
                double porcentaje = total > 0 ? Math.Round((double)grupo.Count() / total * 100, 2) : 0;
                double ganancia = grupo.Sum(r => r.PrecioTotal);

                EstadisticaServicioDto dto = new EstadisticaServicioDto
                {
                    Nombre = grupo.Key,
                    Categoria = primera.Servicio.Categoria,
                    Precio = primera.Servicio.Precio,
                    Porcentaje = porcentaje,
                    Ganancia = ganancia
                };

                estadisticas.Add(dto);
            }

            return estadisticas;
        }
    }


}
