namespace Messenger.Domain.Entities;

public class UserRoom : Entity
{
    public Room Room { get; set; }

    public Guid RoomId { get; set; }

    public User User { get; set; }

    public Guid UserId { get; set; }
}