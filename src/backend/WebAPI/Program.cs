using WebAPI.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.AddApplicationServices();
builder.AddInfrastructureServices();
builder.AddWebApiServices();

var app = builder.Build();

// Exception handler configuration
app.UseExceptionHandler(options =>
{

});

if (app.Environment.IsDevelopment())
{
    // Initialize Database
    //var databaseInitializer = app.Services.GetRequiredService<DatabaseInitializer>();
    //databaseInitializer.Initialize();
}
else
{
    // HSTS configuration (for Strict-Transportation-Security Header)
    /* The default HSTS value is 30 days. We may need to change this for production scenarios */
    app.UseHsts();
}

// health check (UseHealthChecks)

// Https redirection configuration (Any request sent to http will be redirected to https)
app.UseHttpsRedirection();

// Static files configuration (Serves file from current request path (wwwroot))
//app.UseStaticFiles();

// Swagger configuration
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//app.UseSwaggerUI(settings =>
//{
//    settings.DocumentTitle = "Simulation Pi Endpoints";
//});


// Routing configuration
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}"
    );

app.MapRazorPages();

//app.MapFallbackToPage("index.html");
//app.MapFallbackToPage("/index");

// CORS configuration
//

// Authentication configuration
// 

// Authorization configuration
//

// Custom middleware(s) configuration
// Endpoint configuration
//app.Map("/", () => Results.Redirect("/api"));

//app.MapDefaultEndpoint();

app.MapEndpoints();

app.Run();

public partial class Program { }