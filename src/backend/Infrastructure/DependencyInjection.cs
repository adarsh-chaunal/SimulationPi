using System.Data;
using Application.Common.Interfaces;
using Application.Common.Services;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.Data.SqlClient;
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

        //builder.Services.AddSingleton<DatabaseInitializer>();

        builder.Services.AddSingleton<IDbConnectionFactory, DbConnectionFactory>();
        builder.Services.AddScoped<IPlotService, PlotService>();
        builder.Services.AddScoped<IDbConnection>(sp =>
                            new SqlConnection(builder.Configuration.GetConnectionString("DefaultConnection")));
        builder.Services.AddScoped(typeof(IDatabaseRepository<>), typeof(DatabaseRepository<>));
        builder.Services.AddScoped<IAccountService, AccountService>();

        return builder;
    }
}