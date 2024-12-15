using Domain.Entities;
using MediatR;

namespace Application.Plots.Command.UpdatePlot;

#region Command

public record UpdatePlotCommand : IRequest<Plot>
{
    public Plot Plot { get; init; }
}

#endregion

#region Handler

public class UpdatePlotCommandHandler : IRequestHandler<UpdatePlotCommand, Plot>
{
    #region Fields


    #endregion

    #region Methods

    public async Task<Plot> Handle(UpdatePlotCommand command, CancellationToken cancellation)
    {
        return new();
    }

    #endregion
}

#endregion