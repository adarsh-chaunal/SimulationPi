﻿namespace Application.Common.Dtos;

public class PlotDto
{
    public int? ID { get; set; }

    public string? UniqueID { get; set; }

    public int? FileID { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }

    public string? CreatedBy { get; set; }

    public DateTimeOffset? CreatedAt { get; set; }

    public string? LastModifiedBy { get; set; }

    public DateTimeOffset? LastModifiedAt { get; set; }

    public bool IsActive { get; set; }

    public FileDto? File { get; set; }
}