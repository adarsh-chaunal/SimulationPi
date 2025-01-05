namespace Application.Common.Dtos;

public class PlotDto
{
    public string ID { get; set; } = string.Empty;

    public int MediaID { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset LastModifiedAt { get; set; }

    public bool IsActive { get; set; }

    public MediaDto? Media { get; set; }
}