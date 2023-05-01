using MediatR;
using Messenger.Application.Commands;
using Messenger.Core.Entities;
using Messenger.Database.Context;

namespace Messenger.Application.CommandHandlers.Rooms;

public class CreateRoomCommandHandler : IRequestHandler<CreateRoomCommand, Guid>
{
    private readonly MessengerContext _db;

    private const string DefaultImage =
        "https://sites.cns.utexas.edu/sites/default/files/geometry_lab/files/default_person.jpg?m=1654796730";

    public CreateRoomCommandHandler(MessengerContext db)
    {
        _db = db;
    }

    public async Task<Guid> Handle(CreateRoomCommand request, CancellationToken cancellationToken)
    {
        var users = _db.Users.Where(u => request.Members.Contains(u.Id)).ToList();
        var usersRooms = users.Select(user => new UserRoom { User = user }).ToList();

        var room = new Room
        {
            UserRooms = usersRooms,
            Messages = new List<Message>(),
            Image = new Image(request.Image ?? DefaultImage)
        };

        var id = (await _db.Rooms.AddAsync(room, cancellationToken)).Entity.Id;

        await _db.SaveChangesAsync(cancellationToken);

        return id;
    }
}