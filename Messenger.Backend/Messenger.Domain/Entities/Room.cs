using Messenger.Domain.Enums;

namespace Messenger.Domain.Entities;

public class Room : Entity
{
    public ICollection<Message> Messages { get; set; }

    public TypeEncryption TypeEncryption { get; set; }

    public ICollection<UserRoom> UserRooms { get; set; }
}