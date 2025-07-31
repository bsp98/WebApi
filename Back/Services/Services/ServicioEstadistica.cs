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

        //    public GeneralEstadisticaDto ObtenerResumenGeneral(int? anioFiltro = null)
        //    {
        //        IEnumerable<Reserva> reservas = _repositorioReserva.GetAll();
        //        IEnumerable<Egreso> egresos = _repositorioEgreso.GetAll();

        //        int mesActual = DateTime.Now.Month;
        //        int anioActual = DateTime.Now.Year;

        //        int anioConsulta = anioFiltro ?? anioActual;

        //        // Totales solo del mes actual
        //        double ingresosTotales = reservas
        //            .Where(r => r.Fecha.Month == mesActual && r.Fecha.Year == anioActual)
        //            .Sum(r => r.Servicio.Precio);

        //        double egresosTotales = egresos
        //            .Where(e => e.Fecha.Month == mesActual && e.Fecha.Year == anioActual)
        //            .Sum(e => e.Monto);

        //        // BALANCES por mes del año filtrado
        //        var reservasFiltradasAnio = reservas.Where(r => r.Fecha.Year == anioConsulta).ToList();
        //        var egresosFiltradosAnio = egresos.Where(e => e.Fecha.Year == anioConsulta).ToList();

        //        List<BalanceMensualDto> balances = new List<BalanceMensualDto>();

        //        var reservasAgrupadas = reservasFiltradasAnio
        //            .GroupBy(r => r.Fecha.Month)
        //            .Select(g =>
        //            {
        //                double ingresosMes = g.Sum(r => r.Servicio.Precio);
        //                double egresosMes = egresosFiltradosAnio.Where(e => e.Fecha.Month == g.Key).Sum(e => e.Monto);

        //                return new BalanceMensualDto
        //                {
        //                    Anio = anioConsulta,
        //                    Mes = g.Key,
        //                    Ingresos = ingresosMes,
        //                    Egresos = egresosMes,
        //                };
        //            }).ToList();

        //        // ESTADÍSTICAS DE SERVICIOS del año filtrado
        //        int totalReservas = reservasFiltradasAnio.Count;

        //        var reservasPorServicio = reservasFiltradasAnio
        //            .GroupBy(r => r.Servicio.Nombre)
        //            .Select(g =>
        //            {
        //                var primera = g.First();
        //                return new EstadisticaServicioDto
        //                {
        //                    Nombre = g.Key,
        //                    Categoria = primera.Servicio.Categoria,
        //                    Precio = primera.Servicio.Precio,
        //                    Porcentaje = Math.Round((double)g.Count() / totalReservas * 100, 2),
        //                    Ganancia = g.Sum(r => r.Servicio.Precio)
        //                };
        //            }).ToList();

        //        return new GeneralEstadisticaDto
        //        {
        //            TotalIngresos = ingresosTotales,
        //            TotalEgresos = egresosTotales,
        //            BalancesMensuales = balances,
        //            EstadisticasServicios = reservasPorServicio
        //        };
        //    }
        //}

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
            return reservas.Sum(r => r.Servicio.Precio);
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
                double ingresos = grupo.Sum(r => r.Servicio.Precio);
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
                double ganancia = grupo.Sum(r => r.Servicio.Precio);

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
