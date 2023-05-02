using MediatR;
using Messenger.Core.Models;

namespace Messenger.Application.Commands;

public class RegistrationCommand : IRequest<AuthenticateResponseModel>
{
    public string Email { get; set; }

    public string Password { get; set; }

    public string? UserName { get; set; }

    public RegistrationCommand(string email, string password, string? userName)
    {
        Email = email;
        Password = password;

        if (userName is not null)
        {
            UserName = userName;
        }
    }
}