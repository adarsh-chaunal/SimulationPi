using MediatR;

namespace Application.Plots.Commands.DeletePlot;

#region Command

public record DeletePlotCommand : IRequest<bool>
{
    public required string ID { get; init; }
}

#endregion

#region Handler

public class DeletePlotHandler : IRequestHandler<DeletePlotCommand, bool>
{
    #region Fields



    #endregion

    #region Methods

    public async Task<bool> Handle(DeletePlotCommand request, CancellationToken cancellationToken)
    {


        return await Task.FromResult(true);
    }

    #endregion
}

#endregion