using System.Linq.Expressions;

namespace Application.Common.Interfaces;

public interface IDatabaseRepository<T> where T : class
{
    Task<IEnumerable<T>> GetAllAsync(List<string>? attributes = null,
                            List<(string column, object value, string @operator)>? filters = null,
                            string? orderBy = null,
                            bool descending = false,
                            string? groupBy = null,
                            int? limit = null,
                            int? offset = null);

    Task<T?> GetByIdAsync(object id);

    Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);

    Task<T> AddAsync(T entity);

    Task UpdateAsync(T entity);

    Task DeleteAsync(object id);
}