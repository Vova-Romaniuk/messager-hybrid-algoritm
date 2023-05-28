using MediatR;
using Messenger.Core.Models;
using Messenger.Domain.Models;

namespace Messenger.Application.Commands;

public class SendMessageCommand : IRequest<MessageDto>
{
    public Guid RoomId { get; set; }

    public Guid UserId { get; set; }

    public string Text { get; set; }

    public SendMessageCommand(string text, Guid roomId, Guid userId)
    {
        Text = text;
        RoomId = roomId;
        UserId = userId;
    }
}