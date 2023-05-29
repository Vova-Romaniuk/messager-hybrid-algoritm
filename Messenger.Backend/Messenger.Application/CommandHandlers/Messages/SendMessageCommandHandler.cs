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
using Microsoft.Extensions.Caching.Memory;

namespace Messenger.Application.CommandHandlers.Messages
{
    public class SendMessageCommandHandler : IRequestHandler<SendMessageCommand, MessageDto>
    {
        private readonly MessengerContext _db;
        private readonly IMapper _mapper;
        private readonly CryptoServiceFactory _cryptoServiceFactory;
        private readonly IMemoryCache _cache;

        public SendMessageCommandHandler(
            MessengerContext db,
            IMapper mapper,
            CryptoServiceFactory crypto,
            IMemoryCache cache)
        {
            _db = db;
            _mapper = mapper;
            _cryptoServiceFactory = crypto;
            _cache = cache;
        }

        public async Task<MessageDto> Handle(SendMessageCommand request, CancellationToken cancellationToken)
        {
            if (!await _db.Rooms.AnyAsync(room => room.Id == request.RoomId, cancellationToken))
            {
                throw new NotFoundException(nameof(Room), request.RoomId);
            }

            var crypto = _cryptoServiceFactory.CreateCryptoService(request.TypeEncryption);
            var encryptedMessage = crypto.Encrypt(request.Text);

            var message = new Message
            {
                EncryptedText = encryptedMessage.EncryptedText,
                PrivateKey = encryptedMessage.PrivateKey,
                PublicKey = encryptedMessage.PublicKey,
                UserId = request.UserId,
                RoomId = request.RoomId,
                When = DateTime.Now,
            };

            var messageId = (await _db.Messages.AddAsync(message, cancellationToken)).Entity.Id;
            await _db.SaveChangesAsync(cancellationToken);

            var newMessage = await _db.Messages
                .Include(x=>x.User)
                .ThenInclude(x=>x.Image)
                .FirstAsync(x => x.Id == messageId, cancellationToken: cancellationToken);

            return new MessageDto
            {
                Id = newMessage.Id,
                RoomId = newMessage.RoomId,
                Text = request.Text,
                User = _mapper.Map<UserDto>(newMessage.User),
                When = message.When,
            };
        }
    }
}
