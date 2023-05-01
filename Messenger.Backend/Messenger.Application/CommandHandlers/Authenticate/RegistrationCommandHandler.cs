using MediatR;
using Messenger.Application.Commands;
using Messenger.Application.Exceptions;
using Messenger.Core.Entities;
using Messenger.Core.Interfaces;
using Messenger.Core.Models;
using Messenger.Database.Context;

namespace Messenger.Application.CommandHandlers.Authenticate;

public class RegistrationCommandHandler : IRequestHandler<RegistrationCommand, AuthenticateResponseModel>
{
    private readonly MessengerContext _db;
    private readonly IPasswordService _passwordService;
    private readonly ITokenService _tokenService;

    public RegistrationCommandHandler(
        MessengerContext db,
        IPasswordService passwordService,
        ITokenService tokenService)
    {
        _db = db;
        _passwordService = passwordService;
        _tokenService = tokenService;
    }

    public async Task<AuthenticateResponseModel> Handle(RegistrationCommand request, CancellationToken cancellationToken)
    {
        if (_db.Users.Any(x => x.Email == request.Email || x.UserName == request.UserName))
        {
            throw new AuthenticateException("Аккаунт з такою поштовою скринькою вже існує");
        }

        var user = new User
        {
            UserName = request.UserName ?? request.Email[..request.Email.IndexOf("@", StringComparison.Ordinal)],
            Email = request.Email,
            Password = _passwordService.HashPassword(request.Password),
        };

        var id = (await _db.Users.AddAsync(user, cancellationToken)).Entity.Id;
        user.Id = id;

        var authModel = GenerateTokens(user);

        await _db.SaveChangesAsync(cancellationToken);

        return authModel;
    }

    private AuthenticateResponseModel GenerateTokens(User user)
    {
        var jwtToken = _tokenService.GenerateAccessToken(user);
        var refreshToken = _tokenService.GenerateRefreshToken();

        _db.UserTokens.Add(refreshToken);

        return new AuthenticateResponseModel(jwtToken, refreshToken.Token);
    }
}