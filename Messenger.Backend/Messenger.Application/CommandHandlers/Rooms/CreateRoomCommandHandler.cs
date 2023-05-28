using MediatR;
using Messenger.Application.Commands;
using Messenger.Application.Exceptions;
using Messenger.Application.Gatekeepers;
using Messenger.Database.Context;
using Messenger.Domain.Entities;
using Messenger.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Application.CommandHandlers.Rooms;

public class CreateRoomCommandHandler : IRequestHandler<CreateRoomCommand, Guid>
{
    private readonly MessengerContext _db;
    private readonly ISecurityContext _securityContext;
    private readonly IRoomGatekeeper _roomGatekeeper;
    private readonly IMediator _mediator;

    public CreateRoomCommandHandler(MessengerContext db, ISecurityContext securityContext, IRoomGatekeeper roomGatekeeper, IMediator mediator)
    {
        _db = db;
        _securityContext = securityContext;
        _roomGatekeeper = roomGatekeeper;
        _mediator = mediator;
    }

    public async Task<Guid> Handle(CreateRoomCommand request, CancellationToken cancellationToken)
    {
        var users = _db.Users.Where(u => request.Members.Contains(u.Id)).ToList();
        var currentUser =
            await _db.Users.FirstAsync(x => x.Id == _securityContext.GetCurrentUserId(), cancellationToken);

        users.Add(currentUser);

        try
        {
            await _roomGatekeeper.CreateRoomGatekeeper(users.Select(x => x.Id).ToList());
        }
        catch (ChatIsExistException)
        {
            var chat = await _mediator.Send(
                new GetUserChatCommand(users.First(x => x.Id != currentUser.Id).Id), cancellationToken);

            return chat.Id;
        }

        var usersRooms = users.Select(user => new UserRoom { User = user }).ToList();

        var room = new Room
        {
            TypeEncryption = request.TypeEncryption,
            UserRooms = usersRooms,
            Messages = new List<Message>(),
        };

        var id = (await _db.Rooms.AddAsync(room, cancellationToken)).Entity.Id;

        await _db.SaveChangesAsync(cancellationToken);

        return id;
    }
}