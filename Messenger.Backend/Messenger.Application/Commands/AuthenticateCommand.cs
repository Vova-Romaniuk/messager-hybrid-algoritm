using MediatR;
using Messenger.Core.Models;

namespace Messenger.Core.Commands;

public class AuthenticateCommand : IRequest<AuthenticateResponseModel>
{
    public string Email { get; set; }

    public string Password { get; set; }
}