namespace Messenger.Core.Entities;

public class Room : Entity
{
    public string Title { get; set; }

    public Image Image { get; set; }

    public ICollection<Message> Messages { get; set; }

    public ICollection<UserRoom> UserRooms { get; set; }
}