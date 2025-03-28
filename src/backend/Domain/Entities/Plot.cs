﻿using System.ComponentModel;
using Domain.Common;

namespace Domain.Entities;

public class Plot : BaseAuditableEntity
{
    public int? Plot_FileID { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }

    public File? Plot_File { get; set; }
}