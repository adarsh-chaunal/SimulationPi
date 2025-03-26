using Application.Common.Dtos;
using Application.Common.Interfaces;
using AutoMapper;
using Domain.Entities;
using MediatR;

namespace Application.Accounts.Commands.Register;

#region Command

public record RegisterCommand : IRequest<Result<RegisterResponseDto>>
{
    public required OAuthClientDto OAuthClient { get; init; }
}

#endregion

#region Handler

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, Result<RegisterResponseDto>>
{
    #region Fields

    private readonly IMapper _mapper;
    private readonly IAccountService _accounts;

    #endregion

    #region Ctor

    public RegisterCommandHandler(IMapper mapper,
            IAccountService accounts)
    {
        _mapper = mapper;
        _accounts = accounts;
    }

    #endregion

    #region Method

    public async Task<Result<RegisterResponseDto>> Handle(RegisterCommand command, CancellationToken cancellationToken)
    {
        var oAuthClient = _mapper.Map<OAuthClient>(command.OAuthClient);
        var response = await _accounts.RegisterAsync(oAuthClient);

        return Result<RegisterResponseDto>.Success(response);
    }

    #endregion
}

#endregion