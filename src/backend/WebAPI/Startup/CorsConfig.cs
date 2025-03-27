namespace WebAPI.Startup;

public static class CorsConfig
{
    private const string AllowAllPolicy = "AllowAllPolicy";

    public static void AddCorsServices(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(AllowAllPolicy, policy =>
            {
                policy.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });
    }

    public static void AddCorsConfig(this WebApplication app)
    {
        app.UseCors(AllowAllPolicy);
    }
}