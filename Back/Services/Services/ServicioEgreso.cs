using AutoMapper;
using DataAcces.Interfaces;
using DataAcces.Repositories;
using DataAccess.Interfaces;
using Domain.Dto;
using Domain.Dto.FiltrosDto;
using Domain.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Services.Exceptions;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class ServicioEgreso : IServicioEgreso
    {

        private readonly IRepositorioEgreso _repositorioEgreso;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public ServicioEgreso(IRepositorioEgreso repositorioEgreso, IMapper mapper, IConfiguration configuration)
        {
            _repositorioEgreso=repositorioEgreso;
            _mapper=mapper;
            _configuration=configuration;
        }
        public EgresoDto Add(EgresoDto dto)
        { 
            dto.Validar();
            Egreso nuevoEgreso = _mapper.Map<Egreso>(dto);
            Egreso egreso = _repositorioEgreso.Add(nuevoEgreso);
            return _mapper.Map<EgresoDto>(egreso);
        }


        public List<EgresoDto> GetAll()
        {
            IEnumerable<Egreso> egresos = _repositorioEgreso.GetAll();
            return _mapper.Map<List<EgresoDto>>(egresos);
        }

        public EgresoDto GetById(int id)
        {
            Egreso egreso = _repositorioEgreso.GetById(id);

            if (egreso == null) throw new NoExisteException("No se encontro un egreso con ese id");

            return _mapper.Map<EgresoDto>(egreso);
        }

        public void Remove(int id)
        {
            Egreso egreso = _repositorioEgreso.GetById(id);

            if (egreso == null) throw new NoExisteException("No se encontro un egreso con ese id");

            _repositorioEgreso.Remove(egreso);
        }

        public void Update(int id, EgresoDto dto)
        {
            throw new NotImplementedException();
        }


        public List<EgresoDto> FiltrarEgresos(EgresoFiltrosDto filtros)
        {
            if (filtros.Fecha.HasValue)
            {
                var egresos = _repositorioEgreso.BuscarPorFecha(filtros.Fecha.Value).ToList();

                return _mapper.Map<List<EgresoDto>>(egresos);
            }

            if (filtros.CategoriaEgreso!=null)
            {
                var egresos = _repositorioEgreso.BuscarPorCategoriaEgreso(filtros.CategoriaEgreso).ToList();

                return _mapper.Map<List<EgresoDto>>(egresos);
            }

            return new List<EgresoDto>();
        }



    }
}
