using Messenger.Core.Models;
using Messenger.Domain.Enums;
using Messenger.Domain.Models;

namespace Messenger.Backend.ViewModels;

public class ChatViewModel
{
    public Guid Id { get; set; }

    public IEnumerable<UserDto> Users { get; set; }

    public string Title { get; set; }

    public UserDto Recipient { get; set; }

    public string Image { get; set; }

    public int NotSeenCount { get; set; }

    public TypeEncryption TypeEncryption { get; set; }

    public IEnumerable<MessageDto>? Messages { get; set; }
}