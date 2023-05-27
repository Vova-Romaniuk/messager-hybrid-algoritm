using AutoMapper;
using MediatR;
using Messenger.Application.Commands;
using Messenger.Application.Exceptions;
using Messenger.Core.Models;
using Messenger.Database.Context;
using Messenger.Domain.Entities;
using Messenger.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Application.CommandHandlers.Users;

public class GetCurrentUserCommandHandler : IRequestHandler<GetCurrentUserCommand, UserDto>
{
    private readonly ISecurityContext _securityContext;
    private readonly MessengerContext _db;
    private readonly IMapper _mapper;

    public GetCurrentUserCommandHandler(
        ISecurityContext securityContext,
        MessengerContext db,
        IMapper mapper)
    {
        _securityContext = securityContext;
        _db = db;
        _mapper = mapper;
    }

    public async Task<UserDto> Handle(GetCurrentUserCommand request, CancellationToken cancellationToken)
    {
        var userId = _securityContext.GetCurrentUserId();
        var user = await _db.Users
            .Include(x => x.Image)
            .SingleOrDefaultAsync(
            x => x.Id == userId, cancellationToken);

        if (user is null)
        {
            throw new NotFoundException(nameof(User), userId);
        }

        return _mapper.Map<UserDto>(user);
    }
}