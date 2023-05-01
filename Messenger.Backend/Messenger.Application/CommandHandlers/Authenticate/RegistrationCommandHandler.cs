using MediatR;
using Messenger.Core.Commands;
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
        throw new NotImplementedException();
    }
}