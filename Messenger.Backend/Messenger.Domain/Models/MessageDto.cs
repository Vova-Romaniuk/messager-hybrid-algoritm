using Messenger.Core.Models;

namespace Messenger.Domain.Models;

public class MessageDto
{
    public Guid Id { get; set; }

    public string Text { get; set; }

    public DateTime When { get; set; }

    public UserDto User { get; set; }

    public RoomDto Room { get; set; }

    public bool IsSeen { get; set; }

    public Guid RoomId { get; set; }
}