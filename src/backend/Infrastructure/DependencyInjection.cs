using Infrastructure.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(
                                        this IServiceCollection services,
                                        IConfiguration configuration)
    {
        // Get the connection string and database name from configuration
        //var connectionString = configuration.GetConnectionString("DefaultConnection");
        //var databaseName = configuration.GetSection("DatabaseName");
        //services.AddScoped<IDatabaseInitializer>(provider => new DatabaseInitializer());
        services.AddSingleton<DatabaseInitializer>();

        return services;
    }
}
