using Application.Common.Dtos;
using MediatR;

namespace Application.Plots.Command.UpdatePlot;

#region Command

public record UpdatePlotCommand : IRequest<PlotDto>
{
    public required PlotDto Plot { get; init; }
}

#endregion

#region Handler

public class UpdatePlotCommandHandler : IRequestHandler<UpdatePlotCommand, PlotDto>
{
    #region Fields


    #endregion

    #region Ctor

    public UpdatePlotCommandHandler()
    {
        
    }

    #endregion

    #region Methods

    public async Task<PlotDto> Handle(UpdatePlotCommand command, CancellationToken cancellation)
    {


        return new();
    }

    #endregion
}

#endregion