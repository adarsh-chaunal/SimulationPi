using Application.Common.Dtos;
using Application.Common.Interfaces;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Plots.Commands.CreatePlot;

public record CreatePlotCommand : IRequest<string>
{
    public required PlotDto Plot { get; init; }
}

public class CreatePlotCommandHandler : IRequestHandler<CreatePlotCommand, string>
{
    #region Fields

    private readonly IPlotService _plotService;
    private readonly IMapper _mapper;


    #endregion

    #region Ctor

    public CreatePlotCommandHandler(IPlotService plotService,
                IMapper mapper)
    {
        _plotService = plotService;
        _mapper = mapper;
    }

    #endregion

    #region Methods

    public async Task<string> Handle(CreatePlotCommand request, CancellationToken cancellationToken)
    {
        var plot = _mapper.Map<Plot>(request.Plot);

        var isSuccess = await _plotService.CreateAsync(plot);

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