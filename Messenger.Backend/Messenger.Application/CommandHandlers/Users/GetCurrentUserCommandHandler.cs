using AutoMapper;
using MediatR;
using Messenger.Application.Commands;
using Messenger.Application.Exceptions;
using Messenger.Core.Models;
using Messenger.Database.Context;
using Messenger.Domain.Entities;
using Messenger.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Messenger.Application.CommandHandlers.Users
{
    public class GetCurrentUserCommandHandler : IRequestHandler<GetCurrentUserCommand, UserDto>
    {
        private readonly ISecurityContext _securityContext;
        private readonly MessengerContext _db;
        private readonly IMapper _mapper;
        private readonly IMemoryCache _cache;

        public GetCurrentUserCommandHandler(
            ISecurityContext securityContext,
            MessengerContext db,
            IMapper mapper,
            IMemoryCache cache)
        {
            _securityContext = securityContext;
            _db = db;
            _mapper = mapper;
            _cache = cache;
        }

        public async Task<UserDto> Handle(GetCurrentUserCommand request, CancellationToken cancellationToken)
        {
            var userId = _securityContext.GetCurrentUserId();

            var cacheKey = $"User_{userId}";
            if (_cache.TryGetValue(cacheKey, out UserDto userDto))
            {
                return userDto;
            }

            var user = await _db.Users
                .Include(x => x.Image)
                .SingleOrDefaultAsync(x => x.Id == userId, cancellationToken);

            if (user is null)
            {
                throw new NotFoundException(nameof(User), userId);
            }

            userDto = _mapper.Map<UserDto>(user);

            _cache.Set(cacheKey, userDto, TimeSpan.FromMinutes(10));

            return userDto;
        }
    }
}