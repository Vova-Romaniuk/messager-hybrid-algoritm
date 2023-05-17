using MediatR;
using Messenger.Core.Models;

namespace Messenger.Application.Commands;

public class GetUserChatCommand : IRequest<RoomDto>
{
    public GetUserChatCommand(Guid id)
    {
        Id = id;
    }

    public Guid Id { get; set; }
}