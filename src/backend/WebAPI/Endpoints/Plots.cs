using Application.Plots.Command.CreatePlot;
using Application.Plots.Command.DeletePlot;
using Application.Plots.Command.UpdatePlot;
using Application.Plots.Queries.GetPlot;
using Application.Plots.Queries.GetPlotsWithPagination;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
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

    public async Task<Ok<List<Plot>>> GetAll(ISender sender, [AsParameters] GetPlotsWithPaginationQuery query)
    {
        var viewModel = await sender.Send(query);

        return TypedResults.Ok(viewModel);
    }

    public async Task<Ok<Plot>> Get(ISender sender, string id)
    {
        var viewModel = await sender.Send(new GetPlotQuery { ID = id });

        return TypedResults.Ok(viewModel);
    }

    public async Task<Created<string>> Create(ISender sender, [FromBody] CreatePlotCommand command)
    {
        var id = await sender.Send(command);

        return TypedResults.Created($"/{typeof(Plot)}/{id}", id);
    }

    public async Task<Results<NoContent, BadRequest>> Update(ISender sender, string id, [FromBody] UpdatePlotCommand command)
    {
        if (command.Plot.UniqueID != id) return TypedResults.BadRequest();

        await sender.Send(command);

        return TypedResults.NoContent();
    }

    public async Task<NoContent> Delete(ISender sender, string id)
    {
        await sender.Send(new DeletePlotCommand { ID = id });

        return TypedResults.NoContent();
    }
}