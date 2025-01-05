using Application.Common.Dtos;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Plots.Queries.GetPlot;

#region Query

public record GetPlotQuery : IRequest<PlotDto?>
{
    public required string ID { get; init; }
}

#endregion

#region Handler

public class GetPlotQueryHandler : IRequestHandler<GetPlotQuery, PlotDto?>
{
    #region Fields

    private readonly IPlotService _plotService;

    #endregion

    #region Ctor 

    public GetPlotQueryHandler(IPlotService plotService)
    {
        _plotService = plotService;
    }

    #endregion

    #region Method

    public async Task<PlotDto?> Handle(GetPlotQuery request, CancellationToken cancellationToken)
    {
        // need to implement mapper here 

        //return await _plotService.Get(request.ID);
        return new();
    }

    #endregion
}

#endregion