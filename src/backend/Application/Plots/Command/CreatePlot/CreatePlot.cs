using Domain.Entities;
using MediatR;

namespace Application.Plots.Command.CreatePlot;

public record CreatePlotCommand : IRequest<bool>
{
    public required Plot Plot { get; init; }
}

public class CreatePlotCommandHandler : IRequestHandler<CreatePlotCommand, bool>
{
    #region Fields



    #endregion

    #region Methods

    public Task<bool> Handle(CreatePlotCommand request, CancellationToken cancellationToken)
    {
        return Task.FromResult(true);
    } 

    #endregion
}