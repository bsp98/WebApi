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
        public List<BloqueHorario> Bloques { get; set; }

        public Agenda(DateTime fecha)
        {
            Fecha = fecha.Date;
            Bloques = GenerarBloquesPorDia();
        }
        public Agenda()
        {
        }
         public static List<BloqueHorario> GenerarBloquesPorDia() {

            if (DateTime.Now.DayOfWeek == DayOfWeek.Saturday)
            {//cambiar el horario de los sabados
              return  GenerarBloques(new TimeSpan(09, 0, 0), new TimeSpan(16, 0, 0), 10);
            }
            else {
              return  GenerarBloques(new TimeSpan(08, 0, 0), new TimeSpan(18, 0, 0), 10);

            }
        }

        private static List<BloqueHorario> GenerarBloques(TimeSpan desde, TimeSpan hasta, int duracionMinutos)
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

        public List<BloqueHorario> ObtenerBloquesAReservar(Reserva reserva)
        {
            List<BloqueHorario> bloques = new List<BloqueHorario>();
            foreach (var bloque in Bloques)
            {
                bool bloq = reserva.HoraInicio < bloque.HoraFin && reserva.HoraFin > bloque.HoraInicio;
                if (bloq)
                {
                    bloques.Add(bloque);
                }
            }
            return bloques;
        }

        public void DesmarcarBloquesReservados(Reserva reserva)
        {
            
            foreach (var bloque in Bloques)
            {
                bool bloq = reserva.HoraInicio < bloque.HoraFin && reserva.HoraFin > bloque.HoraInicio;
                if (bloq)
                {
                   bloque.EstaDisponible=true;
                }
            }
            
        }

        public List<BloqueHorario> ObtenerDisponibles()
        {
            return Bloques.Where(b => b.EstaDisponible).ToList();
        }


        public bool EstaDisponible(TimeSpan inicio, TimeSpan fin)
        {
            return Bloques.Where(b=>b.HoraInicio < fin && b.HoraFin > inicio).All(b => b.EstaDisponible);
        }

        public static List<BloqueHorario> ObtenerBloquesInicioDisponibles(int duracionMinutos, List<BloqueHorario> bloques)
        {
            int bloquesNecesarios = duracionMinutos / 10;
            var bloquesDisponibles = new List<BloqueHorario>();

            for (int i = 0; i <= bloques.Count - bloquesNecesarios; i++)
            {
                var bloquesParaServicio = bloques.Skip(i).Take(bloquesNecesarios).ToList();

                if (bloquesParaServicio.All(b => b.EstaDisponible))
                {
                    bloquesDisponibles.Add(bloques[i]);
                }
            }

            return bloquesDisponibles;
        }

        public BloqueHorario ObtenerBloqueHorario(TimeSpan horaInicio, TimeSpan horaFin)
        {
           
            for (int i = 0; i<Bloques.Count; i++) {
                BloqueHorario bloque = Bloques[i];
                if (bloque.HoraInicio == horaInicio && bloque.HoraFin == horaFin) { return bloque;  }
              

            }
            return null;
        }
        public List<BloqueHorario> ObtenerBloquesHorario(TimeSpan horaInicio, TimeSpan horaFin)
        {
            List<BloqueHorario> bloques = new List<BloqueHorario>();
            for (int i = 0; i < Bloques.Count; i++)
            {
                BloqueHorario bloque = Bloques[i];
                if (bloque.HoraFin > horaInicio && bloque.HoraInicio < horaFin) { bloques.Add(bloque); }
            

            }
            return bloques;
        }


       

    }
}
