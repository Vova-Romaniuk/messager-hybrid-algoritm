namespace Messenger.Domain.Entities;

public class UserToken : Entity
{
    public Guid UserId { get; set; }

    public User User { get; set; }

    public string Token { get; set; }

    public DateTime Expires { get; set; }

    public DateTime Created { get; set; }

    public DateTime? Revoked { get; set; }

    public string ReplacedByToken { get; set; } = string.Empty;
}