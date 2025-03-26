using System.Data;
using System.Linq.Expressions;
using System.Reflection;
using Application.Common.Helpers;
using Application.Common.Interfaces;
using Dapper;
using Infrastructure.Common.Helpers;

namespace Infrastructure.Services;

public class DatabaseRepository<T> : IDatabaseRepository<T> where T : class
{
    #region Fields

    private readonly IDbConnection _dbConnection;

    #endregion

    #region Ctor

    public DatabaseRepository(IDbConnection dbConnection)
    {
        _dbConnection = dbConnection;// ?? throw new ArgumentNullException(nameof(dbConnection));
    }

    #endregion

    #region Methods

    public async Task<T> AddAsync(T entity)
    {
        string tableName = GetTableName();
        var properties = GetProperties();

        var columns = string.Join(", ", properties);
        var parameters = string.Join(", ", properties.Select(p => $"@{p}"));

        var query = $"INSERT INTO {tableName} ({columns}) VALUES ({parameters});" +
                    $"SELECT CAST(SCOPE_IDENTITY() as int);";
        var id = await _dbConnection.ExecuteScalarAsync(query, entity);

        PropertyInfo keyProperty = typeof(T).GetProperty(GetKeyColumn()) ?? throw new InvalidOperationException("No key column found");
        keyProperty.SetValue(entity, id);

        return entity;
    }

    public async Task DeleteAsync(object id)
    {
        string tableName = GetTableName();
        string keyColumn = GetKeyColumn();

        var query = $"DELETE FROM {tableName} WHERE {keyColumn} = @ID";

        await _dbConnection.ExecuteAsync(query, new { ID = id });
    }

    public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
    {
        string tableName = GetTableName();
        string whereClause = ToSqlCondition(predicate);

        var query = $"SELECT * FROM {tableName} WHERE {whereClause}";
        return await _dbConnection.QueryAsync<T>(query);
    }

    public async Task<IEnumerable<T>> GetAllAsync(List<string>? attributes = null,
                                        List<(string column, object value, string @operator)>? filters = null,
                                        string? orderBy = null,
                                        bool descending = false,
                                        string? groupBy = null,
                                        int? limit = null,
                                        int? offset = null)
    {
        string tableName = GetTableName();
        var queryBuilder = new DynamicQueryBuilder()
                                .Select(tableName, attributes?.Count > 0 ? string.Join(", ", attributes) : "*");

        // Filters
        if (filters != null)
        {
            foreach (var (column, value, @operator) in filters)
            {
                queryBuilder.Where($"{column} {@operator}", value);
            }
        }

        // Group
        if (!string.IsNullOrWhiteSpace(groupBy))
        {
            queryBuilder.GroupBy(groupBy);
        }

        // Order
        if (!string.IsNullOrWhiteSpace(orderBy))
        {
            queryBuilder.OrderBy(orderBy, descending);
        }

        // Limit
        if (limit.HasValue) queryBuilder.Limit(limit.Value);

        // Offset
        if (offset.HasValue) queryBuilder.Offset(offset.Value);

        var (sql, parameter) = queryBuilder.Build();

        return await _dbConnection.QueryAsync<T>(sql, parameter);
    }

    public async Task<T?> GetByIdAsync(object id)
    {
        string tableName = GetTableName();
        string keyColumn = GetKeyColumn();

        var query = $"SELECT * FROM {tableName} WHERE {keyColumn} = @ID";
        return await _dbConnection.QueryFirstOrDefaultAsync<T>(query, new { ID = id });
    }

    public async Task UpdateAsync(T entity)
    {
        string tableName = GetTableName();
        string keyColumn = GetKeyColumn();
        string uniqueKeyColumn = GetUniqueKeyColumn();
        string createdAtColumn = GetCreatedAtColumn();
        string createdByColumn = GetCreatedByColumn();

        var properties = GetProperties().Where(p =>
        !p.Equals(keyColumn, StringComparison.OrdinalIgnoreCase)
        && !p.Equals(uniqueKeyColumn, StringComparison.OrdinalIgnoreCase)
        && !p.Equals(createdAtColumn, StringComparison.OrdinalIgnoreCase)
        && !p.Equals(createdByColumn, StringComparison.OrdinalIgnoreCase));

        var setClause = string.Join(", ", properties.Select(p => $"{p} = @{p}"));
        var query = $"UPDATE {tableName} SET {setClause} WHERE {keyColumn} = @{keyColumn}";

        await _dbConnection.ExecuteAsync(query, entity);
    }

    #region HelperMethod

    private static string GetTableName()
    {
        return typeof(T).Name.Pluralize();
    }

    private static string GetKeyColumn()
    {
        return "ID";
    }

    private static string GetUniqueKeyColumn()
    {
        return "UniqueID";
    }

    private static string GetCreatedAtColumn()
    {
        return "CreatedAt";
    }

    private static string GetCreatedByColumn()
    {
        return "CreatedBy";
    }

    private static IEnumerable<string> GetProperties()
    {
        return typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance)
                        .Where(property => property.CanRead && property.CanWrite)
                        .Select(property => property.Name);
    }

    private static string ToSqlCondition(Expression<Func<T, bool>> predicate)
    {
        return predicate.Body.ToString()
            .Replace("AndAlso", "AND")
            .Replace("OrElse", "OR")
            .Replace("\"", "'");
    }

    #endregion

    #endregion
}