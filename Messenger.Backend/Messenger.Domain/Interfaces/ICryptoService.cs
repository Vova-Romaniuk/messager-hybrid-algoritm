namespace Messenger.Core.Interfaces;

public interface ICryptoService
{
    string Encrypt(string message, string publicKey);
    string Decrypt(string encryptedMessage, string privateKey);
}