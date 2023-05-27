using Messenger.Domain.Interfaces;

namespace Messenger.Application.Services;

public class PasswordHasherService : IPasswordService
{
    public string HashPassword(string password) => BCrypt.Net.BCrypt.HashPassword(password);

    public bool VerifyPassword(string password, string hashingString)
    {
        return BCrypt.Net.BCrypt.Verify(password, hashingString);
    }
}