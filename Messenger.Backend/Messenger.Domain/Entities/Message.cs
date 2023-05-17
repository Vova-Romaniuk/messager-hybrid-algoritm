namespace Messenger.Core.Entities;

public class Message : Entity
{
    public string EncryptedText { get; set; }

    public byte[] PrivateKey { get; set; }

    public byte[] PublicKey { get; set; }

    public DateTime When { get; set; } = DateTime.Now;

    public User? User { get; set; }

    // Sender id
    public Guid UserId { get; set; }

    public Room? Room { get; set; }

    public Guid RoomId { get; set; }

    public bool AllSeen { get; set; } = false;

    // TODO Add seen messages!
}