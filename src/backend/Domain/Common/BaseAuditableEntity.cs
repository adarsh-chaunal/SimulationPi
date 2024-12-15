namespace Domain.Common;

public class BaseAuditableEntity : BaseEntity
{
    public DateTimeOffset CreatedAt { get; set; }

    public string? CreatedBy { get; set; }

    public DateTimeOffset LastModifiedAt { get; set; }

    public string? LastModifiedBy { get; set; }

    public bool IsActive { get; set; }

    public bool IsArchived { get; set; }
}
