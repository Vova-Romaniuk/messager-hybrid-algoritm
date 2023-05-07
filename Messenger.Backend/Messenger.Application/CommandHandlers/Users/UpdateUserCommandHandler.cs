using MediatR;
using Messenger.Application.Commands;
using Messenger.Application.Exceptions;
using Messenger.Core.Entities;
using Messenger.Core.Interfaces;
using Messenger.Database.Context;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Application.CommandHandlers.Users;

public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand>
{
    private readonly MessengerContext _db;
    private readonly ISecurityContext _securityContext;

    public UpdateUserCommandHandler(MessengerContext db, ISecurityContext securityContext)
    {
        _db = db;
        _securityContext = securityContext;
    }

    public async Task Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        var id = _securityContext.GetCurrentUserId();
        var user = await _db.Users.Include(x => x.Image)
            .SingleOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (user is null)
        {
            throw new NotFoundException(nameof(User), id);
        }

        if (user.Email != request.UserDto.Email
            && await _db.Users.AnyAsync(x => x.Email == request.UserDto.Email, cancellationToken))
        {
            throw new ArgumentException("Такий емейл користувача вже існує");
        }

        if (user.UserName != request.UserDto.UserName
            && await _db.Users.AnyAsync(x => x.UserName == request.UserDto.UserName, cancellationToken))
        {
            throw new ArgumentException("Такий юзернейм користувача вже існує");
        }

        user.Description = request.UserDto.Description;
        user.Email = request.UserDto.Email;
        user.FullName = request.UserDto.FullName;

        _db.Users.Update(user);

        await _db.SaveChangesAsync(cancellationToken);
    }
}