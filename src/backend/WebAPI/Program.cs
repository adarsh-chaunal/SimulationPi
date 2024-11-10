using WebAPI;
using Infrastructure;
using Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddWebApiServices()
                .AddInfrastructureServices(builder.Configuration);

var app = builder.Build();

// Initialize Database
//var databaseInitializer = app.Services.GetRequiredService<DatabaseInitializer>();
//databaseInitializer.Initialize();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.Run();