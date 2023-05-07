using MediatR;

namespace Messenger.Application.Commands;

public class UpdateAvatarCommand : IRequest
{
    public UpdateAvatarCommand(string image)
    {
        Image = image;
    }

    public string Image { get; set; }
}