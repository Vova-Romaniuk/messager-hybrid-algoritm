using AutoMapper;
using MediatR;
using Messenger.Application.Commands;
using Messenger.Application.Exceptions;
using Messenger.Application.Factory;
using Messenger.Core.Models;
using Messenger.Database.Context;
using Messenger.Domain.Entities;
using Messenger.Domain.Interfaces;
using Messenger.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Application.CommandHandlers.Rooms;

public class GetRoomPreviewByIdCommandHandler : IRequestHandler<GetRoomPreviewByIdCommand, RoomDto>
{
    private readonly MessengerContext _db;
    private readonly IMapper _mapper;
    private readonly ISecurityContext _securityContext;
    private readonly CryptoServiceFactory _cryptoServiceFactory;

    public GetRoomPreviewByIdCommandHandler(MessengerContext db, IMapper mapper, ISecurityContext securityContext,
        CryptoServiceFactory cryptoServiceFactory)
    {
        _db = db;
        _mapper = mapper;
        _securityContext = securityContext;
        _cryptoServiceFactory = cryptoServiceFactory;
    }

    public async Task<RoomDto> Handle(GetRoomPreviewByIdCommand request, CancellationToken cancellationToken)
    {
        var room = _db.Rooms
            .Include(x => x.UserRooms)
            .ThenInclude(x => x.User)
            .Include(x => x.Messages)
            .ThenInclude(x => x.User)
            .FirstOrDefault(x => x.Id == request.Id);

        if (room is null)
        {
            throw new NotFoundException(nameof(Room), request.Id);
        }

        return Map(room);
    }

    private RoomDto Map(Room room)
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
                When = new DateTimeOffset(roomLastMessage.When, TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev").GetUtcOffset(roomLastMessage.When)),
            });
        }

        roomDto.NotSeenCount =
            room.Messages.Count(x => x.IsSeen == false && x.UserId != _securityContext.GetCurrentUserId());

        return roomDto;
    }
}