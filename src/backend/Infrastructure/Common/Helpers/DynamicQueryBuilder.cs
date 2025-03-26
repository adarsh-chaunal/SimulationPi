using System.Text;
using Dapper;

namespace Infrastructure.Common.Helpers;

public class DynamicQueryBuilder
{
    private readonly StringBuilder _query = new();
    private readonly DynamicParameters _parameters = new();
    private bool _whereAdded = false;

    public DynamicQueryBuilder Select(string table, string columns = "*")
    {
        _query.Append($"SELECT {columns} FROM {table} ");
        return this;
    }

    public DynamicQueryBuilder Where(string condition, object value)
    {
        if (!_whereAdded)
        {
            _query.Append("WHERE ");
            _whereAdded = true;
        }
        else
        {
            _query.Append("AND ");
        }

        string paramName = $"@p{_parameters.ParameterNames.Count()}";
        _query.Append($"{condition} {paramName} ");
        _parameters.Add(paramName, value);

        return this;
    }

    public DynamicQueryBuilder GroupBy(string columns)
    {
        _query.Append($"GROUP BY {columns} ");
        return this;
    }

    public DynamicQueryBuilder Having(string condition, object value)
    {
        _query.Append("HAVING ");
        string paramName = $"@p{_parameters.ParameterNames.Count()}";
        _query.Append($"{condition} {paramName} ");
        _parameters.Add(paramName, value);

        return this;
    }

    public DynamicQueryBuilder OrderBy(string columns, bool descending = false)
    {
        _query.Append($"ORDER BY {columns} {(descending ? "DESC" : "ASC")} ");
        return this;
    }

    public DynamicQueryBuilder Limit(int limit)
    {
        _query.Append($"LIMIT {limit} ");
        return this;
    }

    public DynamicQueryBuilder Offset(int offset)
    {
        _query.Append($"OFFSET {offset} ");
        return this;
    }

    public (string Query, DynamicParameters Parameters) Build()
    {
        return (_query.ToString(), _parameters);
    }
}