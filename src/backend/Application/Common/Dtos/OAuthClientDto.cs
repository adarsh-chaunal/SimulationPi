namespace Application.Common.Dtos;

public class OAuthClientDto
{
    public int ID { get; set;}

    public string Name { get; set; } = string.Empty;

    public int ClientID { get; set; }

    public string ClientSecret { get; set; } = string.Empty;

    public string RedirectUri { get; set; } = string.Empty;
}