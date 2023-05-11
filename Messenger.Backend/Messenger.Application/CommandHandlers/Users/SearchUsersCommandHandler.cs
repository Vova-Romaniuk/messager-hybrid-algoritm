using AutoMapper;
using MediatR;
using Messenger.Application.Commands;
using Messenger.Core.Models;
using Messenger.Database.Context;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Application.CommandHandlers.Users;

public class SearchUsersCommandHandler : IRequestHandler<SearchUserCommand, IEnumerable<UserDto>>
{
    private readonly MessengerContext _db;
    private readonly IMapper _mapper;

    public SearchUsersCommandHandler(MessengerContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    public async Task<IEnumerable<UserDto>> Handle(SearchUserCommand request, CancellationToken cancellationToken)
    {
        var keyWord = request.searchWord?.ToLower().Trim();

        if (string.IsNullOrEmpty(keyWord))
        {
            return _mapper.Map<IEnumerable<UserDto>>(await _db.Users.ToListAsync(cancellationToken));
        }

        var users = await _db.Users
            .Include(x => x.Image)
            .Where(x => x.UserName.ToLower().Contains(keyWord)
                        || x.FullName!.ToLower().Contains(keyWord))
            .ToListAsync(cancellationToken);

        return _mapper.Map<IEnumerable<UserDto>>(users);
    }
}