using Domain.Entities;

namespace Application.Common.Interfaces;

public interface IPlotService
{
    Task<Plot?> Get(string id);

    Task<bool> Create(Plot plot);
}