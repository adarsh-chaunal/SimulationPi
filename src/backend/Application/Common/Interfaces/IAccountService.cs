using Application.Common.Dtos;
using Domain.Entities;

namespace Application.Common.Interfaces;

public interface IAccountService
{
    Task<RegisterResponseDto> RegisterAsync(OAuthClient oAuthClient);
}