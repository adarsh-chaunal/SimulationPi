using Domain.Entities;
using MediatR;

namespace Application.Plots.Command.CreatePlot;

public record CreatePlotCommand : IRequest<string>
{
    public required Plot Plot { get; init; }
}

public class CreatePlotCommandHandler : IRequestHandler<CreatePlotCommand, string>
{
    #region Fields



    #endregion

    #region Methods

    public Task<string> Handle(CreatePlotCommand request, CancellationToken cancellationToken)
    {
        return Task.FromResult("id");
    } 

    #endregion
}