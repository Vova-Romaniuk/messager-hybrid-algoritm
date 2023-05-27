
using Messenger.Domain.Enums;

namespace Messenger.Backend.ViewModels;

public record RoomViewModel(IEnumerable<Guid> Members, TypeEncryption TypeEncryption);