namespace Messenger.Core.Interfaces;

public interface IAsymmetricEncryptionService
{
    string EncryptWithPublicKey(string message, string publicKey);
    string DecryptWithPrivateKey(string encryptedMessage, string privateKey);
    string GenerateKey();
}