using AutoMapper;
using DataAcces.Interfaces;
using Domain.Dto;
using Microsoft.Extensions.Configuration;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class ServicioPublicacion : IServicioPublicacion
    {

        private readonly IRepositorioPublicacion _repositorioPublicacion;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public ServicioPublicacion(IRepositorioPublicacion repositorioPublicacion, IMapper mapper, IConfiguration configuration)
        {
            _repositorioPublicacion=repositorioPublicacion;
            _mapper=mapper;
            _configuration=configuration;
        }

        public PublicacionDto Add(PublicacionDto dto)
        {
            throw new NotImplementedException();
        }

        public List<PublicacionDto> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Remove(int id)
        {
            throw new NotImplementedException();
        }
    }
}
