using Application.Common.Dtos;
using Application.Common.Interfaces;
using Domain.Entities;

namespace Application.Common.Services;

public class AccountService : IAccountService
{

    #region Fields

    private readonly IDatabaseRepository<OAuthClient> _databaseRepository;


    #endregion

    #region Ctor

    public AccountService(IDatabaseRepository<OAuthClient> databaseRepository)
    {
        _databaseRepository = databaseRepository;
    }

    #endregion

    #region Method
    public async Task<RegisterResponseDto> RegisterAsync(OAuthClient oAuthClient)
    {
        oAuthClient.ClientId = Guid.NewGuid().ToString("N");
        oAuthClient.ClientSecret = Guid.NewGuid().ToString("N");
        var client = await _databaseRepository.AddAsync(oAuthClient);

        return new RegisterResponseDto
        {
            ClientID = client.ClientId,
            ClientSecret = client.ClientSecret
        };

    }
    #endregion
}
