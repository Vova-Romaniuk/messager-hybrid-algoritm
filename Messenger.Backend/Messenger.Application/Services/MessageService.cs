using AutoMapper;
using Messenger.Application.Exceptions;
using Messenger.Application.Factory;
using Messenger.Core.Models;
using Messenger.Database.Context;
using Messenger.Domain.Entities;
using Messenger.Domain.Enums;
using Messenger.Domain.Interfaces;
using Messenger.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Application.Services;


public class MessageService : IMessageService
{
    private readonly MessengerContext _db;
    private readonly CryptoServiceFactory _cryptoServiceFactory;
    private readonly  IMapper _mapper;

    public MessageService(MessengerContext db, CryptoServiceFactory cryptoServiceFactory, IMapper mapper)
    {
        _db = db;
        _cryptoServiceFactory = cryptoServiceFactory;
        _mapper = mapper;
    }

    public async Task<MessageDto> Send(Guid roomId, Guid userId, string text, TypeEncryption typeEncryption)
    {
        if (!await _db.Rooms.AnyAsync(room => room.Id == roomId))
        {
            throw new NotFoundException(nameof(Room), roomId);
        }

        await Task.Run(async () =>
        {
            var crypto = _cryptoServiceFactory.CreateCryptoService(typeEncryption);
            var encryptedMessage = crypto.Encrypt(text);
            var message = new Message
            {
                EncryptedText = encryptedMessage.EncryptedText,
                PrivateKey = encryptedMessage.PrivateKey,
                PublicKey = encryptedMessage.PublicKey,
                UserId = userId,
                RoomId = roomId,
                When = DateTime.Now,
            };

            await _db.Messages.AddAsync(message);
            await _db.SaveChangesAsync();
        });
        TimeZoneInfo ukraineTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev");

        DateTimeOffset ukraineNow = DateTimeOffset.Now.ToOffset(ukraineTimeZone.GetUtcOffset(DateTimeOffset.Now));
        return new MessageDto
        {
            Id = Guid.NewGuid(),
            RoomId = roomId,
            Text = text,
            When = ukraineNow.DateTime,
        };
    }

}