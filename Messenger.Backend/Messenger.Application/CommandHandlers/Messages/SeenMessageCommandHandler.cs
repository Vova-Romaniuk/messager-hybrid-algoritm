using MediatR;
using Messenger.Application.Commands;
using Messenger.Application.Exceptions;
using Messenger.Database.Context;
using Messenger.Domain.Entities;
using Messenger.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Application.CommandHandlers.Messages;

public class SeenMessageCommandHandler : IRequestHandler<SeenMessageCommand>
{
    private readonly MessengerContext _db;
    private readonly ISecurityContext _securityContext;

    public SeenMessageCommandHandler(MessengerContext db, ISecurityContext securityContext)
    {
        _db = db;
        _securityContext = securityContext;
    }

    public async Task Handle(SeenMessageCommand request, CancellationToken cancellationToken)
    {
        var userId = _securityContext.GetCurrentUserId();
        var room = await _db.Rooms
            .Include(x => x.Messages)
            .FirstOrDefaultAsync(x => x.Id == request.RoomId, cancellationToken);

        if (room is null)
        {
            throw new NotFoundException(nameof(Room), request.RoomId);
        }

        foreach (var message in room.Messages.Where(x => x.IsSeen == false && x.UserId != userId))
        {
            message.IsSeen = true;
        }

        _db.Rooms.Update(room);

        await _db.SaveChangesAsync(cancellationToken);
    }
}