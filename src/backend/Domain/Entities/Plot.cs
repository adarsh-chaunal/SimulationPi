using Domain.Common;

namespace Domain.Entities;

public class Plot : BaseAuditableEntity
{
    public string Name { get; set; }

    public string Description { get; set; }

    public int Order { get; set; }

    public Media? DisplayImage { get; set; }
}