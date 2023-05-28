using MediatR;
using Messenger.Application.Commands;
using Messenger.Application.Exceptions;
using Messenger.Database.Context;
using Messenger.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Application.CommandHandlers.Rooms;

public class DeleteRoomCommandHandler : IRequestHandler<DeleteRoomCommand>
{
    private readonly MessengerContext _db;

    public DeleteRoomCommandHandler(MessengerContext db)
    {
        _db = db;
    }

    public async Task Handle(DeleteRoomCommand request, CancellationToken cancellationToken)
    {
        var id = request.Id;

        if (id == default)
        {
            throw new ArgumentException("Щось пішло не так!");
        }

        var room = await _db.Rooms
            .Include(x => x.UserRooms).ThenInclude(x => x.Room)
            .Include(x => x.Messages)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (room == null)
        {
            throw new NotFoundException(nameof(Room), id);
        }

        _db.Rooms.Remove(room);
        _db.UserRooms.RemoveRange(room.UserRooms);
        _db.Messages.RemoveRange(room.Messages);

        await _db.SaveChangesAsync(cancellationToken);
    }
}