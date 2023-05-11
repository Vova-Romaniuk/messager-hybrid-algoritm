namespace Messenger.Core.Models;

public class RoomDto
{
    public Guid Id { get; set; }

    public IEnumerable<UserDto> Users { get; set; }

    public IEnumerable<MessageDto> Messages { get; set; }

    public string Title { get; set; }

    public string Image { get; set; }
}