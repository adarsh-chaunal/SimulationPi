using System.Data;

namespace Infrastructure.Data;

public interface IDbConnectionFactory
{
    IDbConnection CreateConnection();
}
