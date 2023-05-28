using MediatR;

namespace Messenger.Application.Commands;

public class SeenMessageCommand : IRequest
{
    public Guid RoomId { get; set; }

    public SeenMessageCommand(Guid roomId)
    {
        RoomId = roomId;
    }
}