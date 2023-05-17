using Messenger.Core.Models;

namespace Messenger.Core.Interfaces;

public interface ICryptoService
{
    EncryptedMessage Encrypt(string message);
    string Decrypt(EncryptedMessage encryptedMessage);
}