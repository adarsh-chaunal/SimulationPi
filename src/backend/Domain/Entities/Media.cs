using Domain.Common;

namespace Domain.Entities;
public class Media : BaseAuditableEntity
{
    public required string MIMEType { get; set; }

    public required string Path { get; set; }

    public required string Name { get; set; }

    public required string Extension { get; set; }
}
