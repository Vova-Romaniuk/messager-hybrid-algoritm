using MediatR;
using Messenger.Application.Commands;
using Messenger.Application.Exceptions;
using Messenger.Core.Models;
using Messenger.Database.Context;
using Messenger.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Application.CommandHandlers.Rooms;

public class CleanRoomCommandHandler : IRequestHandler<CleanRoomCommand>
{
    private readonly MessengerContext _db;

    public CleanRoomCommandHandler(MessengerContext db)
    {
        _db = db;
    }

    public async Task Handle(CleanRoomCommand request, CancellationToken cancellationToken)
    {
        var id = request.Id;

        if (id == default)
        {
            throw new ArgumentException("Щось пішло не так!");
        }

        var room = await _db.Rooms
            .Include(x => x.Messages)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (room == null)
        {
            throw new NotFoundException(nameof(Room), id);
        }

        room.Messages.Clear();

        _db.Rooms.Update(room);
        await _db.SaveChangesAsync(cancellationToken);
    }
}