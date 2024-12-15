using Domain.Entities;
using MediatR;

namespace Application.Plots.Queries.GetPlotsWithPagination;

#region Query

public record GetPlotsWithPaginationQuery : IRequest<List<Plot>>
{
    public int PageNumber { get; init; }

    public int PageSize { get; init; }
}

#endregion

#region Handler

public class GetPlotsWithPaginationQueryHandler : IRequestHandler<GetPlotsWithPaginationQuery, List<Plot>>
{
    #region Method

    public async Task<List<Plot>> Handle(GetPlotsWithPaginationQuery request, CancellationToken cancellationToken)
    {
        return [];
        //throw new NotImplementedException();
    }

    #endregion
}

#endregion