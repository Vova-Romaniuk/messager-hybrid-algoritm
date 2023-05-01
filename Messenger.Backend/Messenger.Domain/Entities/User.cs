namespace Messenger.Core.Entities;

public class User : Entity
{
    public string UserName { get; set; }

    public string FullName { get; set; }

    public string Email { get; set; }

    public string Description { get; set; }

    public Image Image { get; set; }

    public string Password { get; set; }

    public ICollection<UserToken> UserTokens { get; set; }
}