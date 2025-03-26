namespace Application.Common.Dtos;

public class RegisterResponseDto
{
    public string ClientID { get; set; }

    public string ClientSecret { get; set; } = string.Empty;
}