using Application.Common.Interfaces;
using Microsoft.OpenApi.Models;
using WebAPI.Services;

namespace Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    public static void AddWebApiServices(this IHostApplicationBuilder builder)
    {
        builder.Services.AddScoped<IUserService, UserService>();

        builder.Services.AddHttpContextAccessor();

        builder.Services.AddRazorPages();

        builder.Services.AddEndpointsApiExplorer();

        builder.Services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Simulation Pi API",
                Version = "v1",
            });
        });

        //builder.Services.AddOpenApiDocument((configure, sp) =>
        //{
        //    configure.Title = "CleanArchitecture API";

        //};
    }
}