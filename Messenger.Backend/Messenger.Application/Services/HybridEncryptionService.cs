using Messenger.Core.Interfaces;

namespace Messenger.Application.Services;

public class HybridEncryptionService : ICryptoService
{
    private readonly IAsymmetricEncryptionService _asymmetricEncryptionService;
    private readonly ISymmetricEncryptionService _symmetricEncryptionService;

    public HybridEncryptionService(IAsymmetricEncryptionService asymmetricEncryptionService, ISymmetricEncryptionService symmetricEncryptionService)
    {
        _asymmetricEncryptionService = asymmetricEncryptionService;
        _symmetricEncryptionService = symmetricEncryptionService;
    }

    public string Encrypt(string message, string publicKey)
    {
        var symmetricKey = _symmetricEncryptionService.GenerateKey();
        var encryptedMessage = _symmetricEncryptionService.EncryptWithKey(message, symmetricKey);

        var encryptedKey = _asymmetricEncryptionService.EncryptWithPublicKey(symmetricKey, publicKey);

        var combinedMessage = encryptedKey + ":" + encryptedMessage;

        return combinedMessage;
    }

    public string Decrypt(string encryptedMessage, string privateKey)
    {
        var parts = encryptedMessage.Split(':');
        var encryptedKey = parts[0];
        var encryptedData = parts[1];

        var symmetricKey = _asymmetricEncryptionService.DecryptWithPrivateKey(encryptedKey, privateKey);

        var decryptedMessage = _symmetricEncryptionService.DecryptWithKey(encryptedData, symmetricKey);

        return decryptedMessage;
    }
}