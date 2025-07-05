using AutoMapper;
using DataAcces.Interfaces;
using DataAcces.Repositories;
using Domain.Dto;
using Domain.Models;
using Services.Exceptions;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class ServicioDiaNoLaborable: IServicioDiaNoLaborable
    {
        private readonly IRepositorioDiaNoLaborable _repositorioDiaNoLaborable;
        private readonly IMapper _mapper;

        public ServicioDiaNoLaborable(IRepositorioDiaNoLaborable repositorioDiaNoLaborable, IMapper mapper)
        {
            _repositorioDiaNoLaborable = repositorioDiaNoLaborable;
            _mapper = mapper;
        }

        public DiaNoLaborableDto Add(DiaNoLaborableDto diaNoLaborableDto)
        {

            if (_repositorioDiaNoLaborable.Existe(diaNoLaborableDto.Fecha)) throw new ExisteException("Ya existe");
           

            diaNoLaborableDto.Validar();
            
            DiaNoLaborable nuevoDiaNoLaborable = _mapper.Map<DiaNoLaborable>(diaNoLaborableDto);
            DiaNoLaborable diaNoLaborable = _repositorioDiaNoLaborable.Add(nuevoDiaNoLaborable);


            return _mapper.Map<DiaNoLaborableDto>(diaNoLaborable);
        }

        public List<DiaNoLaborableDto> GetAll()
        {
            IEnumerable<DiaNoLaborable> DnL = _repositorioDiaNoLaborable.GetAll();
            return _mapper.Map<List<DiaNoLaborableDto>>(DnL);
        }

        public void Remove(int id)
        {
            DiaNoLaborable DnL = _repositorioDiaNoLaborable.GetById(id);

            if (DnL == null) throw new NoExisteException("No se encontro una dia no laborable con ese id");

            _repositorioDiaNoLaborable.Remove(DnL);
        }
    }
}
