namespace Messenger.Core.Models;

public class UserDto
{
    public Guid  Id { get; set; }

    public string UserName { get; set; }

    public string? FullName { get; set; }

    public string Email { get; set; }

    public string? Description { get; set; }

    public string Image { get; set; }

    public string Password { get; set; }
}