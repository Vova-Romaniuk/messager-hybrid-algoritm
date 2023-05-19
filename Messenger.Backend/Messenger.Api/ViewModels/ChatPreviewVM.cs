using Messenger.Core.Models;

namespace Messenger.Backend.ViewModels;

public class ChatPreviewViewModel
{
    public Guid Id { get; set; }

    public IEnumerable<UserDto> Users { get; set; }

    public string Title { get; set; }

    public UserDto Recipient { get; set; }

    public string Image { get; set; }

    public MessageDto Message { get; set; }
}