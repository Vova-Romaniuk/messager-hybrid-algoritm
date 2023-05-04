using MediatR;
using Messenger.Application.Commands;
using Messenger.Application.Exceptions;
using Messenger.Core.Entities;
using Messenger.Core.Interfaces;
using Messenger.Core.Models;
using Messenger.Database.Context;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Application.CommandHandlers.Authenticate;

public class AuthenticateCommandHandler : IRequestHandler<AuthenticateCommand, AuthenticateResponseModel>
{
    private readonly MessengerContext _db;
    private readonly ITokenService _tokenService;
    private readonly IPasswordService _passwordService;

    public AuthenticateCommandHandler(
        MessengerContext db,
        ITokenService tokenService,
        IPasswordService passwordService)
    {
        _db = db;
        _tokenService = tokenService;
        _passwordService = passwordService;
    }

    public async Task<AuthenticateResponseModel> Handle(AuthenticateCommand request, CancellationToken cancellationToken)
    {
        var user = await _db.Users
            .SingleOrDefaultAsync(x => x.Email == request.Email, cancellationToken);

        if (user is null)
        {
            throw new NotFoundException(nameof(User), request.Email);
        }

        if (!_passwordService.VerifyPassword(request.Password, user.Password))
        {
            throw new AuthenticateException("Incorrect email or password");
        }

        var jwtToken = _tokenService.GenerateAccessToken(user);
        var refreshToken = _tokenService.GenerateRefreshToken();

        await _db.SaveChangesAsync(cancellationToken);

        return new AuthenticateResponseModel(jwtToken, refreshToken.Token);
    }
}