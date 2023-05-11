namespace Messenger.Backend.ViewModels;

public record RoomViewModel(string Title, IEnumerable<Guid> Members, string? Image);