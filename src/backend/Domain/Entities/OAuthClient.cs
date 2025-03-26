using Domain.Common;

namespace Domain.Entities;

public class OAuthClient : BaseAuditableEntity
{
    public string Name { get; set; }

    public string ClientId { get; set; }

    public string ClientSecret { get; set; }

    public string RedirectUri { get; set; }
}
