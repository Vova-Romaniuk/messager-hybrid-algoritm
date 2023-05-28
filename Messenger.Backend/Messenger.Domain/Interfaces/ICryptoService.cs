using Messenger.Domain.Models;

namespace Messenger.Domain.Interfaces;

public interface ICryptoService
{
    EncryptedMessage Encrypt(string message);
    string Decrypt(EncryptedMessage encryptedMessage);
}