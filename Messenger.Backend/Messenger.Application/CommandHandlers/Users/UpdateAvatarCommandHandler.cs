using MediatR;
using Messenger.Application.Commands;
using Messenger.Application.Exceptions;
using Messenger.Core.Entities;
using Messenger.Core.Interfaces;
using Messenger.Database.Context;
using Microsoft.EntityFrameworkCore;

namespace Messenger.Application.CommandHandlers.Users;

public class UpdateAvatarCommandHandler : IRequestHandler<UpdateAvatarCommand>
{
    private readonly MessengerContext _db;
    private readonly ISecurityContext _securityContext;

    public UpdateAvatarCommandHandler(MessengerContext db, ISecurityContext securityContext)
    {
        _db = db;
        _securityContext = securityContext;
    }

    public async Task Handle(UpdateAvatarCommand request, CancellationToken cancellationToken)
    {
        var id = _securityContext.GetCurrentUserId();
        var user = await _db.Users.Include(x => x.Image)
            .SingleOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (user is null)
        {
            throw new NotFoundException(nameof(User), id);
        }

        if (user.Image is null)
        {
            user.Image = new Image(request.Image);
        }
        else
        {
            user.Image.ImageUrl = request.Image;
        }

        _db.Users.Update(user);

        await _db.SaveChangesAsync(cancellationToken);
    }
}