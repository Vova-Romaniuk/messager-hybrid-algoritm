namespace Messenger.Domain.Interfaces;

public interface IPasswordService
{
    string HashPassword(string password);

    bool VerifyPassword(string password, string hashingPassword);
}