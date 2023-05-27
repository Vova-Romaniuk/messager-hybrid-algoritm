using AutoMapper;
using MediatR;
using Messenger.Application.Commands;
using Messenger.Core.Models;
using Messenger.Database.Context;
using Messenger.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Application.CommandHandlers.Users;

public class SearchUsersCommandHandler : IRequestHandler<SearchUserCommand, IEnumerable<UserDto>>
{
    private readonly MessengerContext _db;
    private readonly IMapper _mapper;
    private readonly ISecurityContext _securityContext;

    public SearchUsersCommandHandler(MessengerContext db, IMapper mapper, ISecurityContext securityContext)
    {
        _db = db;
        _mapper = mapper;
        _securityContext = securityContext;
    }

    public async Task<IEnumerable<UserDto>> Handle(SearchUserCommand request, CancellationToken cancellationToken)
    {
        var keyWord = request.searchWord?.ToLower().Trim();
        var currentUserId = _securityContext.GetCurrentUserId();

        if (string.IsNullOrEmpty(keyWord))
        {
            var allUsers = await _db.Users
                .Include(x => x.Image)
                .Where(x => x.Id != currentUserId)
                .ToListAsync(cancellationToken);

            return _mapper.Map<IEnumerable<UserDto>>(allUsers);
        }

        var users = await _db.Users
            .Include(x => x.Image)
            .Where(x => (x.UserName.ToLower().Contains(keyWord)
                         || x.FullName!.ToLower().Contains(keyWord)) && x.Id != currentUserId)
            .ToListAsync(cancellationToken);

        return _mapper.Map<IEnumerable<UserDto>>(users);
    }
}