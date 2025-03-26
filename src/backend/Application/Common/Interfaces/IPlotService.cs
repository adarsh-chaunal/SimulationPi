using Domain.Entities;

namespace Application.Common.Interfaces;

public interface IPlotService
{
    Task<Plot?> GetAsync(string id);

    Task<bool> CreateAsync(Plot plot);
}