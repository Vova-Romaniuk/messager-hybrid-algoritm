using AutoMapper;
using MediatR;
using Messenger.Application.Commands;
using Messenger.Application.Exceptions;
using Messenger.Core.Models;
using Messenger.Database.Context;
using Messenger.Domain.Entities;
using Messenger.Domain.Interfaces;
using Messenger.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Application.CommandHandlers.Rooms;

public class GetUserChatCommandHandler : IRequestHandler<GetUserChatCommand, RoomDto>
{
    private readonly MessengerContext _db;
    private readonly ISecurityContext _securityContext;
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;
    private readonly ICryptoService _crypto;

    public GetUserChatCommandHandler(MessengerContext db, ISecurityContext securityContext, IMediator mediator, IMapper mapper, ICryptoService crypto)
    {
        _db = db;
        _securityContext = securityContext;
        _mediator = mediator;
        _mapper = mapper;
        _crypto = crypto;
    }

    public async Task<RoomDto> Handle(GetUserChatCommand request, CancellationToken cancellationToken)
    {
        var chatId = request.Id;
        var userId = _securityContext.GetCurrentUserId();

        var room = await _db.Rooms
                       .FirstOrDefaultAsync(x => x.Id == chatId, cancellationToken) ??
                  await _db.Rooms
                       .FirstOrDefaultAsync(x =>
                           x.UserRooms.Count == 2 &&
                           x.UserRooms.Any(y => y.UserId == chatId) &&
                           x.UserRooms.Any(y => y.UserId == userId), cancellationToken);

        var res = await _db.Rooms
            .Include(x => x.UserRooms)
            .ThenInclude(x => x.User)
            .ThenInclude(x => x.Image)
            .Include(c => c.Messages
                .OrderBy(x => x.When))
            .ThenInclude(x => x.User)
            .ThenInclude(x => x.Image)
            .FirstOrDefaultAsync(x => x.Id == room.Id, cancellationToken);

        if (res == null)
        {
            throw new NotFoundException(nameof(Room), room.Id);
        }

        var roomDto = _mapper.Map<RoomDto>(res);

        roomDto.Messages = MapMessages(res.Messages);

        return roomDto;
    }

    private List<MessageDto> MapMessages(IEnumerable<Message> messages)
    {
        var messagesDtos = messages.Select(message => new MessageDto
            {
                Id = message.Id,
                RoomId = message.RoomId,
                Room = _mapper.Map<RoomDto>(message.Room),
                Text = _crypto.Decrypt(new EncryptedMessage(message.EncryptedText, message.PrivateKey, message.PublicKey)),
                User = _mapper.Map<UserDto>(message.User),
                When = message.When,
            })
            .ToList();

        return messagesDtos;
    }
}