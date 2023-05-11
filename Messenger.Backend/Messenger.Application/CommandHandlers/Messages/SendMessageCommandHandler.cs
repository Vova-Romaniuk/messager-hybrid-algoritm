using AutoMapper;
using MediatR;
using Messenger.Application.Commands;
using Messenger.Application.Exceptions;
using Messenger.Core.Entities;
using Messenger.Core.Interfaces;
using Messenger.Core.Models;
using Messenger.Database.Context;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Application.CommandHandlers.Messages;

public class SendMessageCommandHandler : IRequestHandler<SendMessageCommand, MessageDto>
{
    private readonly MessengerContext _db;
    private readonly ISecurityContext _securityContext;
    private readonly IMapper _mapper;

    public SendMessageCommandHandler(MessengerContext db, ISecurityContext securityContext, IMapper mapper)
    {
        _db = db;
        _securityContext = securityContext;
        _mapper = mapper;
    }

    public async Task<MessageDto> Handle(SendMessageCommand request, CancellationToken cancellationToken)
    {
        if (!await _db.Rooms.AnyAsync(room => room.Id == request.RoomId, cancellationToken))
        {
            throw new NotFoundException(nameof(Room), request.RoomId);
        }

        var messageEntity =
            await _db.Messages.AddAsync(
                new Message { Text = request.Text, UserId = request.UserId, RoomId = request.RoomId, }, cancellationToken);

        await _db.SaveChangesAsync(cancellationToken);

        var newMessage = await _db.Messages
            .Include(x=>x.User)
            .ThenInclude(x=>x.Image)
            .FirstAsync(x => x.Id == messageEntity.Entity.Id, cancellationToken);

        return _mapper.Map<Message, MessageDto>(newMessage);
    }
}