using Messenger.Domain.Entities;

namespace Messenger.Domain.Interfaces;

public interface ITokenService
{
    string GenerateAccessToken(User? user);

    UserToken GenerateRefreshToken();
}