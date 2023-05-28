using MediatR;

namespace Messenger.Application.Commands;

public class CleanRoomCommand : IRequest
{
    public Guid Id { get; set; }

    public CleanRoomCommand(Guid id)
    {
        Id = id;
    }
}