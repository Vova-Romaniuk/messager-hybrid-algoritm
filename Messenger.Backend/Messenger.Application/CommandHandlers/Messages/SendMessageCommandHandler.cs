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
            var room = await GetRoomFromCacheOrDatabase(request.RoomId);
            var user = await GetUserFromCacheOrDatabase(request.UserId);

            if (room == null)
            {
                throw new NotFoundException(nameof(Room), request.RoomId);
            }

            var crypto = _cryptoServiceFactory.CreateCryptoService(room.TypeEncryption);
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

            _db.Messages.Add(message);
            await _db.SaveChangesAsync(cancellationToken);

            return new MessageDto
            {
                Id = message.Id,
                RoomId = message.RoomId,
                Text = crypto.Decrypt(new EncryptedMessage(
                    message.EncryptedText,
                    message.PrivateKey,
                    message.PublicKey)),
                User = _mapper.Map<UserDto>(user),
                When = message.When,
            };
        }

        private async Task<User> GetUserFromCacheOrDatabase(Guid userId)
        {
            var cacheKey = $"User_{userId}";
            if (_cache.TryGetValue(cacheKey, out User user))
            {
                return user;
            }

            user = await _db.Users.FirstOrDefaultAsync(x => x.Id == userId);

            if (user != null)
            {
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(5));
                _cache.Set(cacheKey, user, cacheEntryOptions);
            }

            return user;
        }

        private async Task<Room> GetRoomFromCacheOrDatabase(Guid roomId)
        {
            var cacheKey = $"Room_{roomId}";
            if (_cache.TryGetValue(cacheKey, out Room room))
            {
                return room;
            }

            room = await _db.Rooms.FirstOrDefaultAsync(x => x.Id == roomId);
            if (room != null)
            {
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(5));
                _cache.Set(cacheKey, room, cacheEntryOptions);
            }

            return room;
        }
    }
}
