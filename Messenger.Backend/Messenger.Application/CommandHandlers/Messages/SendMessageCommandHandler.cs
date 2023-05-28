using AutoMapper;
using MediatR;
using Messenger.Application.Commands;
using Messenger.Application.Exceptions;
using Messenger.Application.Factory;
using Messenger.Core.Models;
using Messenger.Database.Context;
using Messenger.Domain.Entities;
using Messenger.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Application.CommandHandlers.Messages;

public class SendMessageCommandHandler : IRequestHandler<SendMessageCommand, MessageDto>
{
    private readonly MessengerContext _db;
    private readonly IMapper _mapper;
    private readonly CryptoServiceFactory _cryptoServiceFactory;

    public SendMessageCommandHandler(
        MessengerContext db,
        IMapper mapper,
        CryptoServiceFactory crypto)
    {
        _db = db;
        _mapper = mapper;
        _cryptoServiceFactory = crypto;
    }

    public async Task<MessageDto> Handle(SendMessageCommand request, CancellationToken cancellationToken)
    {
        var room = _db.Rooms.FirstOrDefault(room => room.Id == request.RoomId);

        if (room == null)
        {
            throw new NotFoundException(nameof(Room), request.RoomId);
        }

        var crypto = _cryptoServiceFactory.CreateCryptoService(room.TypeEncryption);
        var encryptedMessage = crypto.Encrypt(request.Text);

        var messageId =
            (await _db.Messages.AddAsync(
                new Message
                {
                    EncryptedText = encryptedMessage.EncryptedText,
                    PrivateKey = encryptedMessage.PrivateKey,
                    PublicKey = encryptedMessage.PublicKey,
                    UserId = request.UserId,
                    RoomId = request.RoomId,
                    When = DateTime.Now,
                }, cancellationToken)).Entity.Id;

        await _db.SaveChangesAsync(cancellationToken);

        var newMessage = await _db.Messages
            .Include(x => x.User)
            .ThenInclude(x => x.Image)
            .FirstAsync(x => x.Id == messageId, cancellationToken);

        return new MessageDto
        {
            Id = newMessage.Id,
            RoomId = newMessage.RoomId,
            Text = crypto.Decrypt(new EncryptedMessage(
                newMessage.EncryptedText,
                newMessage.PrivateKey,
                newMessage.PublicKey)),
            User = _mapper.Map<UserDto>(newMessage.User),
            When = newMessage.When,
        };
    }
}