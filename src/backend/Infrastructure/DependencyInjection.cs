using Infrastructure.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    public static IHostApplicationBuilder AddInfrastructureServices(this IHostApplicationBuilder builder)
    {
        // Get the connection string and database name from configuration
        //var connectionString = configuration.GetConnectionString("DefaultConnection");
        //var databaseName = configuration.GetSection("DatabaseName");
        //services.AddScoped<IDatabaseInitializer>(provider => new DatabaseInitializer());

        builder.Services.AddSingleton<DatabaseInitializer>();

        return builder;
    }
}