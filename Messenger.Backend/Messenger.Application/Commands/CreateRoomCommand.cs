using MediatR;

namespace Messenger.Application.Commands;

public class CreateRoomCommand : IRequest<Guid>
{
    public string Title { get; set; }

    public IEnumerable<Guid> Members { get; set; }

    public string? Image { get; set; }

    public CreateRoomCommand(string title, IEnumerable<Guid> members, string? image)
    {
        Title = title;
        Members = members;
        Image = image;
    }
}