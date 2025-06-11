using AutoMapper;
using DataAcces.Interfaces;
using DataAcces.Repositories;
using Domain.Dto;
using Domain.Enum;
using Domain.Exceptions;
using Domain.Models;
using Services.Exceptions;
using Services.Interfaces;


namespace Services.Services
{
    public class ServicioServicio:IServicioServicio
    {
        private readonly IRepositorioServicio _repositorioServicio;
        private readonly IMapper _mapper;


        public ServicioServicio(IRepositorioServicio repositorioServicio, IMapper mapper)
        {
            _repositorioServicio = repositorioServicio;
            _mapper = mapper;
        }



        public ServicioDto Add(ServicioDto servicioDto)
        {

            if (_repositorioServicio.BuscarPorNombre(servicioDto.Nombre) != null)
            {
                throw new ExisteException("Ya existe un servicio con ese nombre");
            }

            servicioDto.Validar();

            //Tipo tipo = _repositorioTipo.BuscarXnombre(dto.Tipo.NombreTipo);

            Servicio nuevoServicio = _mapper.Map<Servicio>(servicioDto);
            Servicio servicio  = _repositorioServicio.Add(nuevoServicio);


            return _mapper.Map<ServicioDto>(servicio);
        }

        public void Remove(int id)
        {

            //if (_repositorioServicio.BuscarPorServicio(id).Any())
            //{
            //    throw new EnUsoException("No se puede eliminar un servicio que esta siendo utilizado");
            //}

            Servicio servicio = _repositorioServicio.GetById(id);

            if (servicio == null) throw new NoExisteException("No se encontro un servicio con ese id");

            _repositorioServicio.Remove(servicio);
        }

        public void Update(int id, ServicioDto dto)
        {
            Servicio servicioValidNombre = _repositorioServicio.BuscarPorNombre(dto.Nombre);
            Servicio servicio = _repositorioServicio.GetById(id);

            if (servicio == null) throw new NoExisteException("No se encontro un servicio con ese id");

            if (servicioValidNombre != null && servicioValidNombre.Nombre != servicio.Nombre ) throw new ExisteException("Ya existe un servicio con ese nombre");


            dto.Validar();

            servicio.Nombre = dto.Nombre;
            servicio.Descripcion = dto.Descripcion;
            servicio.Precio = dto.Precio;
            servicio.Descuento = dto.Descuento;
            servicio.Disponibilidad = dto.Disponibilidad;
            servicio.Categoria = dto.Categoria;
            servicio.TiempoDeDuracionMin = dto.TiempoDeDuracionMin;
            

            _repositorioServicio.Update(servicio);
        }

        public ServicioDto GetById(int id)
        {
            Servicio servicio = _repositorioServicio.GetById(id);

            if (servicio == null) throw new NoExisteException("No se encontro un serivico con ese id");

            return _mapper.Map<ServicioDto>(servicio);

        }


        public List<ServicioDto> GetAll()
        {
            IEnumerable<Servicio> servicios = _repositorioServicio.GetAll();
            return _mapper.Map<List<ServicioDto>>(servicios);
        }


        public List<ServicioDto> ObtenerPorCategoria(CategoriaServicio categoria)
        {
            IEnumerable<Servicio> servicios = new List<Servicio>();

            if (!System.Enum.IsDefined(typeof(CategoriaServicio),categoria))
            {
                throw new DatoIncorrectoException("La categoría es incorrecta");
            }

            if (categoria == CategoriaServicio.Invalido)
            {

                servicios = _repositorioServicio.GetAll();
            }
            else
            {
                servicios = _repositorioServicio.ObtenerPorCategoria(categoria);
            }

            return _mapper.Map<List<ServicioDto>>(servicios);
        }

        public void DeshabilitarOHabilitar(int id)
        {
            Servicio servicio = _repositorioServicio.GetById(id);

            if (servicio == null) throw new NoExisteException("No se encontro un servicio con ese id");

            if (servicio.Disponibilidad == DisponibilidadServicio.Activo)
            {
                servicio.Disponibilidad = DisponibilidadServicio.Inactivo;
            }else
            {
                servicio.Disponibilidad = DisponibilidadServicio.Activo;
            }
            
            


            _repositorioServicio.Update(servicio);
        }


    }
}
