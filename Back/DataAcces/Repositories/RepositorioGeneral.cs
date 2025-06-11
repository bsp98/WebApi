using DataAcces.Interfaces.CRUD;
using Microsoft.EntityFrameworkCore;


namespace DataAcces.Repositories
{
    
    public class RepositorioGeneral<T>: IRepositoryAdd<T>, IRepositoryRemove<T>, IRepositoryUpdate<T>, IRepositoryGetAll<T>, IRepositoryGetById<T> where T : class
    {
        protected DbContext Contexto { get; set; }


       

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


        public T GetById(int id)
        {
            return Contexto.Set<T>().Find(id);
        }

        public IEnumerable<T> GetAll()
        {
            return Contexto.Set<T>().ToList();
        }
    }
}
