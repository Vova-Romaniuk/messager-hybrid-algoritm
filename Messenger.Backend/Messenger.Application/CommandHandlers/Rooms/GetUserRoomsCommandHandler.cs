using System.Linq;
using AutoMapper;
using MediatR;
using Messenger.Application.Commands;
using Messenger.Core.Interfaces;
using Messenger.Core.Models;
using Messenger.Database.Context;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Application.CommandHandlers.Rooms;

public class GetUserRoomsCommandHandler : IRequestHandler<GetUserChats, IEnumerable<RoomDto>>
{
    private readonly MessengerContext _db;
    private readonly IMapper _mapper;
    private readonly ISecurityContext _securityContext;

    public GetUserRoomsCommandHandler(MessengerContext db, IMapper mapper, ISecurityContext securityContext)
    {
        _db = db;
        _mapper = mapper;
        _securityContext = securityContext;
    }

    public async Task<IEnumerable<RoomDto>> Handle(GetUserChats request, CancellationToken cancellationToken)
    {
        var rooms = _db.Rooms
            .Include(x=>x.UserRooms)
            .ThenInclude(x=>x.User)
            .Where(x => x.UserRooms.Any(u => u.User.Id == _securityContext.GetCurrentUserId()));

        if (!rooms.Any())
        {
            return Enumerable.Empty<RoomDto>();
        }

        var userRooms = await rooms.Include(x => x.Messages)
            .Include(x => x.UserRooms)
            .ThenInclude(x => x.User)
            .ThenInclude(x => x.Image)
            .ToListAsync(cancellationToken);

        return _mapper.Map<IEnumerable<RoomDto>>(userRooms);
    }
}