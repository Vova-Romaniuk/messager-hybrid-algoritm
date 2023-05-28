using MediatR;

namespace Messenger.Application.Commands;

public class DeleteRoomCommand : IRequest
{
    public Guid Id { get; set; }

    public DeleteRoomCommand(Guid id)
    {
        Id = id;
    }
}