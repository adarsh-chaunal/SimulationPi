using Domain.Entities;
using MediatR;

namespace Application.Plots.Queries.GetPlot;

#region Query

public record GetPlotQuery : IRequest<Plot>
{
    public string ID { get; init; }
}

#endregion

#region Handler

public class GetPlotQueryHandler : IRequestHandler<GetPlotQuery, Plot>
{
    #region Method

    public async Task<Plot> Handle(GetPlotQuery request, CancellationToken cancellationToken)
    {
        return new();
    }

    #endregion
}

#endregion