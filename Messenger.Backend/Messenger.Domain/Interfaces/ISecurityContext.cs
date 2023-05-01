namespace Messenger.Core.Interfaces;

public interface ISecurityContext
{
    Guid GetCurrentUserId();
}