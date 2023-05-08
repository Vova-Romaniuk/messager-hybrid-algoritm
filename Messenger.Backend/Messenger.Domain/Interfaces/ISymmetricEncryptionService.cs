namespace Messenger.Core.Interfaces;

public interface ISymmetricEncryptionService
{
    string EncryptWithKey(string message, string key);
    string DecryptWithKey(string encryptedMessage, string key);
    string GenerateKey();
}