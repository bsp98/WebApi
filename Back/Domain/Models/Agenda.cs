using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Agenda
    {
        public int AgendaId { get; set; }
        public DateTime Fecha { get; set; }
        public List<BloqueHorario> Bloques { get; private set; }

        public Agenda(DateTime fecha)
        {
            Fecha = fecha.Date;
            Bloques = GenerarBloquesPorDia();
        }

        private List<BloqueHorario> GenerarBloquesPorDia() {

            if (Fecha.DayOfWeek == DayOfWeek.Saturday)
            {//cambiar el horario de los sabados
              return  GenerarBloques(new TimeSpan(09, 0, 0), new TimeSpan(16, 0, 0), 10);
            }
            else {
              return  GenerarBloques(new TimeSpan(08, 0, 0), new TimeSpan(18, 0, 0), 10);

            }
        }

        private List<BloqueHorario> GenerarBloques(TimeSpan desde, TimeSpan hasta, int duracionMinutos)
        {
            List<BloqueHorario> bloques = new List<BloqueHorario>();
            TimeSpan actual = desde;

            while (actual < hasta)
            {
                TimeSpan siguiente = actual.Add(TimeSpan.FromMinutes(duracionMinutos));
                bloques.Add(new BloqueHorario
                {
                    HoraInicio = actual,
                    HoraFin = siguiente,
                    EstaDisponible = true
                });
                actual = siguiente;
            }

            return bloques;
        }

        public void MarcarReservados(IEnumerable<Reserva> reservas)
        {
            foreach (var bloque in Bloques)
            {
                if (reservas.Any(r => r.HoraInicio < bloque.HoraFin && r.HoraFin > bloque.HoraInicio))
                {
                    bloque.EstaDisponible = false;
                }
            }
        }

        public List<BloqueHorario> ObtenerDisponibles()
        {
            return Bloques.Where(b => b.EstaDisponible).ToList();
        }

        public List<BloqueHorario> ObtenerBloquesInicioDisponibles(int duracionMinutos)
        {
            int bloquesNecesarios = duracionMinutos / 10;
            var bloquesDisponibles = new List<BloqueHorario>();

            for (int i = 0; i <= Bloques.Count - bloquesNecesarios; i++)
            {
                var bloquesParaServicio = Bloques.Skip(i).Take(bloquesNecesarios).ToList();

                if (bloquesParaServicio.All(b => b.EstaDisponible))
                {
                    bloquesDisponibles.Add(Bloques[i]);
                }
            }

            return bloquesDisponibles;
        }
    }
}
