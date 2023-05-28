using MediatR;
using Messenger.Application.Commands;
using Messenger.Application.Exceptions;
using Messenger.Core.Models;
using Messenger.Database.Context;
using Messenger.Domain.Entities;
using Messenger.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Application.CommandHandlers.Authenticate;

public class GoogleLoginCommandHandler : IRequestHandler<GoogleAuthCommand, AuthenticateResponseModel>
{
    private readonly MessengerContext _db;
    private readonly ITokenService _tokenService;

    public GoogleLoginCommandHandler(MessengerContext db, ITokenService tokenService)
    {
        _db = db;
        _tokenService = tokenService;
    }

    public async Task<AuthenticateResponseModel> Handle(GoogleAuthCommand request, CancellationToken cancellationToken)
    {
        User? user;
        if (!await _db.Users.AnyAsync(x => x.Email == request.Email, cancellationToken))
        {
            //Register new user logic
            user = await RegisterGoogleUserAsync(request.Email, request.Picture, request.FullName);
        }
        else
        {
            // Login user logic
            user = await LoginGoogleUserAsync(request.Email, request.Picture, request.FullName);
        }

        var jwtToken = _tokenService.GenerateAccessToken(user);
        var refreshToken = _tokenService.GenerateRefreshToken();

        refreshToken.UserId = user.Id;
        await _db.UserTokens.AddAsync(refreshToken, cancellationToken);

        await _db.SaveChangesAsync(cancellationToken);

        return new AuthenticateResponseModel(jwtToken, refreshToken.Token);
    }

    private async Task<User?> RegisterGoogleUserAsync(string email, string picture, string fullName)
    {
        var userEntity = (await _db.Users.AddAsync(new User
        {
            Email = email,
            UserName = email[..email.IndexOf("@", StringComparison.Ordinal)],
            Image = new Image(picture),
            FullName = fullName
        })).Entity;

        return userEntity;
    }

    private async Task<User?> LoginGoogleUserAsync(string email, string picture, string fullName)
    {
        var user = await _db.Users
            .Include(x => x.Image)
            .SingleOrDefaultAsync(x => x.Email == email);

        if (user is null)
        {
            throw new AuthenticateException("Шось пішло не так!");
        }

        if (user.Password is not null)
        {
            throw new AuthenticateException("Ви вже зареєстровані під цим емейлом, але вам потрібно використати пароль!");
        }

        user.FullName = fullName;
        _db.Users.Update(user);

        return user;
    }
}