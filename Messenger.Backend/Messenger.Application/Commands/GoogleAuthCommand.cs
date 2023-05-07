using MediatR;
using Messenger.Core.Models;

namespace Messenger.Application.Commands;

public class GoogleAuthCommand : IRequest<AuthenticateResponseModel>
{
    public GoogleAuthCommand(string email, string picture, string fullName)
    {
        Email = email;
        Picture = picture;
        FullName = fullName;
    }

    public string Email { get; set; }

    public string Picture { get; set; }

    public string FullName { get; set; }
}