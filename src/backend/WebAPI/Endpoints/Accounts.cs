using Application.Accounts.Commands.Register;
using Application.Common.Dtos;
using MediatR;
using WebAPI.Infrastructure;

namespace WebAPI.Endpoints;

public class Accounts : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapPost(Register);
    }

    public async Task<IResult> Register(ISender sender, OAuthClientDto oAuthClientDto)
    {
        var client = await sender.Send(new RegisterCommand { OAuthClient = oAuthClientDto });

        return Results.Ok(client);
    }
}