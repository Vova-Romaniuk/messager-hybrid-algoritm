namespace Messenger.Core.Models;

public class MessagePreviewDto
{
    public string Text { get; set; }

    public DateTime When { get; set; }

    public UserDto User { get; set; }
}