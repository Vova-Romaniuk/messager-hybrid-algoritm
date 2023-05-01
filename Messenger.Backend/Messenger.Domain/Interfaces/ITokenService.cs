using Messenger.Core.Entities;

namespace Messenger.Core.Interfaces;

public interface ITokenService
{
    string GenerateAccessToken(User user);

    UserToken GenerateRefreshToken();
}