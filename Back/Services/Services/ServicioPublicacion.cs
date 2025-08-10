using AutoMapper;
using DataAcces.Interfaces;
using Domain.Dto;
using Domain.Models;
using Microsoft.Extensions.Configuration;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Services.Exceptions;
using DataAcces.Repositories;
using Domain.Enum;
using Domain.Exceptions;

namespace Services.Services
{
    public class ServicioPublicacion : IServicioPublicacion
    {

        private readonly IRepositorioPublicacion _repositorioPublicacion;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public ServicioPublicacion(IRepositorioPublicacion repositorioPublicacion, IMapper mapper, IConfiguration configuration)
        {
            _repositorioPublicacion = repositorioPublicacion;
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<PublicacionDto> CrearPublicacionAsync(CrearPublicacionDto dto, string rutaBaseWeb, string rutaFisicaAbsoluta)
        {
            dto.Validar();

            var nombreArchivo = Guid.NewGuid().ToString() + Path.GetExtension(dto.Imagen.FileName);
            var rutaCompleta = Path.Combine(rutaFisicaAbsoluta, nombreArchivo);

            Directory.CreateDirectory(rutaFisicaAbsoluta);

            using (var stream = new FileStream(rutaCompleta, FileMode.Create))
            {
                await dto.Imagen.CopyToAsync(stream);
            }

            Publicacion publicacion = _mapper.Map<Publicacion>(dto);
            publicacion.ImagenUrl = Path.Combine(rutaBaseWeb, nombreArchivo).Replace("\\", "/");
            publicacion.FechaPublicacion = DateTime.Now;

            await _repositorioPublicacion.AgregarAsync(publicacion);//hacer lo de reserva

            return _mapper.Map<PublicacionDto>(publicacion);
        }


        public async Task<List<PublicacionDto>> ObtenerTodasAsync()
        {
            List<Publicacion> publicaciones = await _repositorioPublicacion.ObtenerTodasAsync();
            return _mapper.Map<List<PublicacionDto>>(publicaciones);
        }


        public async Task EliminarAsync(int id, string rutaWebRoot)
        {
            Publicacion publicacion = await _repositorioPublicacion.ObtenerPorIdAsync(id);
            if (publicacion == null)
                throw new NoExisteException("Publicación no encontrada.");

            // Eliminar archivo físico si existe
            if (!string.IsNullOrEmpty(publicacion.ImagenUrl))
            {
                var nombreRelativo = publicacion.ImagenUrl.TrimStart('/');
                var rutaAbsoluta = Path.Combine(rutaWebRoot, nombreRelativo.Replace("/", Path.DirectorySeparatorChar.ToString()));

                if (File.Exists(rutaAbsoluta))
                    File.Delete(rutaAbsoluta);
            }

            await _repositorioPublicacion.EliminarAsync(publicacion);
        }


        public (List<PublicacionDto> publicaciones, int total) ObtenerPublicacionesPaginados(int page, int pageSize)
        {
            var publicaciones = _repositorioPublicacion.ObtenerPublicacionesPaginados(page, pageSize);
            var total = _repositorioPublicacion.ContarPublicaciones();

            return (_mapper.Map<List<PublicacionDto>>(publicaciones), total);
        }

        public async Task<List<PublicacionDto>> ObtenerPorAnioAsync(int? anio)
        {
            List<Publicacion> publicaciones = await _repositorioPublicacion.ObtenerPorAnioAsync(anio);
            return _mapper.Map<List<PublicacionDto>>(publicaciones);
        }

        public List<PublicacionDto> ObtenerPorCategoria(CategoriaServicio categoria)
        {
            IEnumerable<Publicacion> publicaciones = new List<Publicacion>();

            if (!System.Enum.IsDefined(typeof(CategoriaServicio), categoria))
            {
                throw new DatoIncorrectoException("La categoría es incorrecta");
            }

            if (categoria == CategoriaServicio.Invalido)
            {

                publicaciones = _repositorioPublicacion.GetAll();
            }
            else
            {
                publicaciones = _repositorioPublicacion.ObtenerPorCategoria(categoria);
            }

            return _mapper.Map<List<PublicacionDto>>(publicaciones);
        }

       
    }
}
