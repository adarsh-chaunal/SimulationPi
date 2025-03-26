using Domain.Common;

namespace Domain.Entities;
public class File : BaseAuditableEntity
{
    public string Name { get; set; } = string.Empty;

    public string MIMEType { get; set; } = string.Empty;

    public string Path { get; set; } = string.Empty;

    public string Extension { get; set; } = string.Empty;
}
