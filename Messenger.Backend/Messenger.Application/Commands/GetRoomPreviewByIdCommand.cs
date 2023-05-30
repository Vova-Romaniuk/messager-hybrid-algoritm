using MediatR;
using Messenger.Core.Models;

namespace Messenger.Application.Commands;

public class GetRoomPreviewByIdCommand : IRequest<RoomDto>
{
    public GetRoomPreviewByIdCommand(Guid id)
    {
        Id = id;
    }

    public Guid Id { get; set; }
}