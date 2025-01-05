using Application.Common.Dtos;
using MediatR;

namespace Application.Plots.Queries.GetPlotsWithPagination;

#region Query

public record GetPlotsWithPaginationQuery : IRequest<List<PlotDto>>
{
    public int PageNumber { get; init; }

    public int PageSize { get; init; }
}

#endregion

#region Handler

public class GetPlotsWithPaginationQueryHandler : IRequestHandler<GetPlotsWithPaginationQuery, List<PlotDto>>
{
    #region Method

    public async Task<List<PlotDto>> Handle(GetPlotsWithPaginationQuery request, CancellationToken cancellationToken)
    {
        return [];
        //throw new NotImplementedException();
    }

    #endregion
}

#endregion