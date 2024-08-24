using Domain.Common;

namespace Domain.Entities;
public class User : BaseAuditableEntity
{
    public int? MediaID { get; set; }

    public required string FirstName { get; set; }

    public string? MiddleName { get; set; }

    public string? LastName { get; set; }

    public required string EmailAddress { get; set; }

    public required string PasswordHash { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Gender { get; set; }

    public DateTime DateOfBirth { get; set; }

    public string? Profession { get; set; }

    public string? Country { get; set; }

    public Media? Media { get; set; }
}
