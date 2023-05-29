using MediatR;
using Messenger.Core.Models;

namespace Messenger.Application.Commands;

public class GetUserByIdCommand : IRequest<UserDto>
{
    public Guid Id { get; set; }

    public GetUserByIdCommand(Guid id)
    {
        Id = id;
    }
}