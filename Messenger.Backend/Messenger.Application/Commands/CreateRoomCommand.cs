using MediatR;
using Messenger.Domain.Enums;

namespace Messenger.Application.Commands;

public class CreateRoomCommand : IRequest<Guid>
{
    public IEnumerable<Guid> Members { get; set; }

    public TypeEncryption TypeEncryption { get; set; }

    public CreateRoomCommand(IEnumerable<Guid> members, TypeEncryption encryption)
    {
        Members = members;
    }
}