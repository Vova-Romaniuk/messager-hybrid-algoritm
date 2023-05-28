using System.Linq;
using AutoMapper;
using MediatR;
using Messenger.Application.Commands;
using Messenger.Application.Factory;
using Messenger.Core.Models;
using Messenger.Database.Context;
using Messenger.Domain.Entities;
using Messenger.Domain.Interfaces;
using Messenger.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Application.CommandHandlers.Rooms;

public class GetUserRoomsCommandHandler : IRequestHandler<GetUserChatsCommand, IEnumerable<RoomDto>>
{
    private readonly MessengerContext _db;
    private readonly IMapper _mapper;
    private readonly ISecurityContext _securityContext;
    private readonly CryptoServiceFactory _cryptoServiceFactory;

    public GetUserRoomsCommandHandler(MessengerContext db, IMapper mapper, ISecurityContext securityContext,
        CryptoServiceFactory cryptoServiceFactory)
    {
        _db = db;
        _mapper = mapper;
        _securityContext = securityContext;
        _cryptoServiceFactory = cryptoServiceFactory;
    }

    public async Task<IEnumerable<RoomDto>> Handle(GetUserChatsCommand request, CancellationToken cancellationToken)
    {
        var rooms = _db.Rooms
            .Include(x => x.UserRooms)
            .ThenInclude(x => x.User)
            .Where(x => x.UserRooms.Any(u => u.User.Id == _securityContext.GetCurrentUserId()));

        if (!rooms.Any())
        {
            return Enumerable.Empty<RoomDto>();
        }

        var userRooms = await rooms
            .Include(x => x.Messages)
            .Include(x => x.UserRooms)
            .ThenInclude(x => x.User)
            .ThenInclude(x => x.Image)
            .ToListAsync(cancellationToken);

        return Map(userRooms);
    }

    private IEnumerable<RoomDto> Map(IEnumerable<Room> rooms)
    {
        var listRoomDto = new List<RoomDto>();

        foreach (var room in rooms)
        {
            var roomLastMessage = room.Messages.LastOrDefault();
            var roomDto = new RoomDto
            {
                Messages = new List<MessageDto>(),
                Id = room.Id,
                Users = _mapper.Map<List<UserDto>>(room.UserRooms.Select(x => x.User))
            };

            if (roomLastMessage != null)
            {
                var crypto = _cryptoServiceFactory.CreateCryptoService(room.TypeEncryption);
                roomDto.Messages.Add(new MessageDto()
                {
                    Id = roomLastMessage.Id,
                    RoomId = roomLastMessage.RoomId,
                    Room = _mapper.Map<RoomDto>(roomLastMessage.Room),
                    Text = crypto.Decrypt(new EncryptedMessage(roomLastMessage.EncryptedText,
                        roomLastMessage.PrivateKey, roomLastMessage.PublicKey)),
                    User = _mapper.Map<UserDto>(roomLastMessage.User),
                    When = roomLastMessage.When,
                });
            }

            roomDto.NotSeenCount = room.Messages.Count(x => x.IsSeen == false && x.UserId != _securityContext.GetCurrentUserId());
            listRoomDto.Add(roomDto);
        }
        return listRoomDto;
    }
}