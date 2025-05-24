using DataAcces.Interfaces.CRUD;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAcces.Repositories
{
    
    public class RepositorioGeneral<T>: IRepositoryAdd<T>, IRepositoryRemove<T>, IRepositoryUpdate<T> where T : class
    {
        protected DbContext Contexto { get; set; }


        public RepositorioGeneral(Contexto contexto)
        {
            Contexto = contexto;
        }//REVISARRR

        public RepositorioGeneral(DbContext contexto)
        {
            Contexto=contexto;
        }//rarp

        public T Add(T entity)
        {
            Contexto.Set<T>().Add(entity);
            Contexto.SaveChanges();
            return entity;
        }

        public void Remove(T entity)
        {
            Contexto.Set<T>().Remove(entity);
            Contexto.SaveChanges();
        }

        public void Update(T entity)
        {
            Contexto.Entry(entity).State = EntityState.Modified;
            Contexto.SaveChanges();
        }
    }
}
