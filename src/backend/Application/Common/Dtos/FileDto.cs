namespace Application.Common.Dtos;

public class FileDto
{
    public int? ID { get; set; }

    public string? UniqueID { get; set; }

    public string Name { get; set; } = string.Empty;

    public string MIMEType { get; set; } = string.Empty;

    public string Path { get; set; } = string.Empty;

    public string Extension { get; set; } = string.Empty;

    public string? CreatedBy { get; set; }

    public DateTimeOffset? CreatedAt { get; set; }

    public string? LastModifiedBy { get; set; }

    public DateTimeOffset? LastModifiedAt { get; set; }
}