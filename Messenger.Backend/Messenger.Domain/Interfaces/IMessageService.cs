using Messenger.Domain.Enums;
using Messenger.Domain.Models;

namespace Messenger.Domain.Interfaces;

public interface IMessageService
{
    Task<MessageDto> Send(Guid roomId, Guid userId, string text, TypeEncryption typeEncryption);
}