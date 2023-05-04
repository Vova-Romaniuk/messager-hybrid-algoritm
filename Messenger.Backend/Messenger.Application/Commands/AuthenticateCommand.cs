using MediatR;
using Messenger.Core.Models;

namespace Messenger.Application.Commands;

public class AuthenticateCommand : IRequest<AuthenticateResponseModel>
{
    public string Email { get; set; }

    public string Password { get; set; }


    public AuthenticateCommand(string email, string password)
    {
        Email = email;
        Password = password;
    }
}