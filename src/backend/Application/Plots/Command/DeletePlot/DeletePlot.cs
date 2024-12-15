using MediatR;

namespace Application.Plots.Command.DeletePlot;

#region Command

public record DeletePlotCommand : IRequest<bool>
{
    public string ID { get; init; }
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