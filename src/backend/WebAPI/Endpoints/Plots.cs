using Application.Plots.Command.CreatePlot;
using Application.Plots.Command.DeletePlot;
using Application.Plots.Command.UpdatePlot;
using Application.Plots.Queries.GetPlot;
using Application.Plots.Queries.GetPlotsWithPagination;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Infrastructure;

namespace WebAPI.Endpoints;

public class Plots : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetAll)
            .MapGet(Get, "{id}")
            .MapPost(Create)
            .MapPut(Update, "/{id}")
            .MapDelete(Delete, "/{id}");
    }

    public async Task<List<Plot>> GetAll(ISender sender, [AsParameters] GetPlotsWithPaginationQuery query)
    {
        return await sender.Send(query);
    }

    public async Task<Plot> Get(ISender sender, string id)
    {
        return await sender.Send(new GetPlotQuery { ID = id });
    }

    public async Task<bool> Create(ISender sender, [FromBody] CreatePlotCommand command)
    {
        return await sender.Send(command);
    }

    public async Task<Plot> Update(ISender sender, string id, [FromBody] UpdatePlotCommand command)
    {
        return command.Plot.UniqueID == id
            ? await sender.Send(command)
            : new(); // return "invalid request" error
    }

    public async Task<bool> Delete(ISender sender, string id)
    {
        return await sender.Send(new DeletePlotCommand { ID = id });
    }
}