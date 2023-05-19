using Messenger.Application.Exceptions;
using Messenger.Database.Context;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Application.Gatekeepers;

public interface IRoomGatekeeper
{
    Task CreateRoomGatekeeper(List<Guid> users);
}

public class RoomGatekeeper : IRoomGatekeeper
{
    private readonly MessengerContext _db;

    public RoomGatekeeper(MessengerContext db)
    {
        _db = db;
    }

    public async Task CreateRoomGatekeeper(List<Guid> users)
    {
        var chatIsExist = await _db.Rooms
            .Include(x => x.UserRooms)
            .AnyAsync(
                x => x.UserRooms.Count == users.Count
                     && x.UserRooms.Select(x => x.UserId).Contains(users[0])
                     && x.UserRooms.Select(x => x.UserId).Contains(users[1]));

        if (chatIsExist)
        {
            throw new ChatIsExistException();
        }
    }
}