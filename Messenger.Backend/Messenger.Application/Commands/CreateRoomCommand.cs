using MediatR;

namespace Messenger.Application.Commands;

public class CreateRoomCommand : IRequest<Guid>
{
    public IEnumerable<Guid> Members { get; set; }

    public CreateRoomCommand(IEnumerable<Guid> members)
    {
        Members = members;
    }
}