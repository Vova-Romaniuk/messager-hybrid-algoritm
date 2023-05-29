using MediatR;
using Messenger.Domain.Enums;
using Messenger.Domain.Models;

namespace Messenger.Application.Commands;

public class SendMessageCommand : IRequest<MessageDto>
{
    public Guid RoomId { get; set; }

    public Guid UserId { get; set; }

    public string Text { get; set; }

    public TypeEncryption TypeEncryption { get; set; }

    public SendMessageCommand(string text, Guid roomId, Guid userId, TypeEncryption typeEncryption)
    {
        Text = text;
        RoomId = roomId;
        UserId = userId;
        TypeEncryption = typeEncryption;
    }
}