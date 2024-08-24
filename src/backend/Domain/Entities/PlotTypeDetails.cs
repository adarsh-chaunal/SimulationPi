using Domain.Common;

namespace Domain.Entities;

public class PlotTypeDetails: BaseAuditableEntity
{
    public int GeneralLookupID { get; set; }

    public double Level { get; set; }

    public double ArrowSize { get; set; }

    public string ColourMap { get; set; } = string.Empty;
}
