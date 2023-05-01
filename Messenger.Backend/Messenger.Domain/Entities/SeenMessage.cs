namespace Messenger.Core.Entities;

public class SeenMessage : Entity
{
    public virtual Message Message { get; set; }

    public Guid MessageId { get; set; }

    public virtual User User { get; set; }

    public Guid UserId { get; set; }
}