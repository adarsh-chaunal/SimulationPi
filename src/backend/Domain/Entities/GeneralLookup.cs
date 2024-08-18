using Domain.Common;

namespace Domain.Entities;

public class GeneralLookup : BaseAuditableEntity
{
    public string Type { get; set; } = string.Empty; // Eg. Plot

    public string Name { get; set; } = string.Empty; // Eg. Contour Plot

    public string Description { get; set; } = string.Empty;
}
