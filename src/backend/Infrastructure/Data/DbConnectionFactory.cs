using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Data;

public class DbConnectionFactory : IDbConnectionFactory
{
    private readonly string _connectionString;

    public DbConnectionFactory(IConfiguration configuration)
    {
        _connectionString = configuration?.GetConnectionString("DefaultConnection") ?? throw new NullReferenceException();
    }

    public IDbConnection CreateConnection()
    {
        return new SqlConnection(_connectionString);
    }
}