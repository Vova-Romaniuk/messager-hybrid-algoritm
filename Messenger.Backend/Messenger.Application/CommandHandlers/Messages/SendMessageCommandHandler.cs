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
    private readonly ICryptoService _crypto;
    private readonly IAsymmetricEncryptionService _asymmetricEncryption;
    private readonly ISymmetricEncryptionService _symmetricEncryption;

    public SendMessageCommandHandler(
        MessengerContext db,
        ISecurityContext securityContext,
        IMapper mapper,
        ICryptoService crypto,
        ISymmetricEncryptionService symmetricEncryption,
        IAsymmetricEncryptionService asymmetricEncryption)
    {
        _db = db;
        _securityContext = securityContext;
        _mapper = mapper;
        _crypto = crypto;
        _symmetricEncryption = symmetricEncryption;
        _asymmetricEncryption = asymmetricEncryption;
    }

    public async Task<MessageDto> Handle(SendMessageCommand request, CancellationToken cancellationToken)
    {
        var isRoomExist = _db.Rooms.Any(room => room.Id == request.RoomId);

        if (!isRoomExist)
        {
            throw new NotFoundException(nameof(Room), request.RoomId);
        }

        var encryptedMessage = _crypto.Encrypt(request.Text);

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
            Room = _mapper.Map<RoomDto>(newMessage.Room),
            Text = _crypto.Decrypt(new EncryptedMessage(
                newMessage.EncryptedText,
                newMessage.PrivateKey,
                newMessage.PublicKey)),
            User = _mapper.Map<UserDto>(newMessage.User),
            When = newMessage.When,
        };
    }
}