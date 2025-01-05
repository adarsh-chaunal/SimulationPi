using Application.Common.Dtos;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Plots.Command.CreatePlot;

public record CreatePlotCommand : IRequest<string>
{
    public required PlotDto Plot { get; init; }
}

public class CreatePlotCommandHandler : IRequestHandler<CreatePlotCommand, string>
{
    #region Fields

    private readonly IPlotService _plotService;


    #endregion

    #region Ctor

    public CreatePlotCommandHandler(IPlotService plotService)
    {
        _plotService = plotService;
    }

    #endregion

    #region Methods

    public async Task<string> Handle(CreatePlotCommand request, CancellationToken cancellationToken)
    {
        var plot = new Plot()
        {
            UniqueID = Guid.NewGuid().ToString(),
            Name = request.Plot.Name,
            Description = request.Plot.Description,
            CreatedAt = DateTimeOffset.Now,
            CreatedBy = "",
            LastModifiedAt = DateTimeOffset.Now,
            LastModifiedBy = "",
            IsActive = request.Plot.IsActive
        };

        var isSuccess = await _plotService.Create(plot);

        if (isSuccess)
        {
            return plot.UniqueID;
        }
        else
        {
            throw new Exception(); // Create custom exception.
        }
    } 

    #endregion
}