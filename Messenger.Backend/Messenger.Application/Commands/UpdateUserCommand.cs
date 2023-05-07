using MediatR;
using Messenger.Core.Models;

namespace Messenger.Application.Commands;

public class UpdateUserCommand : IRequest
{
    public UpdateUserCommand(UserDto userDto)
    {
        UserDto = userDto;
    }

    public UserDto UserDto { get; set; }
}