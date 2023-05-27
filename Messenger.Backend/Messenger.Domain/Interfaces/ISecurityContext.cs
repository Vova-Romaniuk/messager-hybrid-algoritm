namespace Messenger.Domain.Interfaces;

public interface ISecurityContext
{
    Guid GetCurrentUserId();
}