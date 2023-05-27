using System.Security.Cryptography;
using System.Text;
using Messenger.Domain.Interfaces;

namespace Messenger.Application.Services;

public class AsymmetricEncryptionService : IAsymmetricEncryptionService
{
    private const int KeySize = 2048;
    private RSAParameters _publicKey;
    private RSAParameters _privateKey;

    public AsymmetricEncryptionService()
    {
        GenerateKeys();
    }

    private void GenerateKeys()
    {
        using var rsa = RSA.Create();
        rsa.KeySize = KeySize;
        _publicKey = rsa.ExportParameters(false);
        _privateKey = rsa.ExportParameters(true);
    }

    public string EncryptWithPublicKey(string message, string publicKeyXml)
    {
        using var rsa = RSA.Create();
        rsa.ImportParameters(_publicKey);

        var messageBytes = Encoding.UTF8.GetBytes(message);
        var encryptedBytes = rsa.Encrypt(messageBytes, RSAEncryptionPadding.OaepSHA256);
        var encryptedMessage = Convert.ToBase64String(encryptedBytes);

        return encryptedMessage;
    }

    public string DecryptWithPrivateKey(string encryptedMessage, string privateKeyXml)
    {
        using var rsa = RSA.Create();
        rsa.ImportParameters(_privateKey);

        var encryptedBytes = Convert.FromBase64String(encryptedMessage);
        var decryptedBytes = rsa.Decrypt(encryptedBytes, RSAEncryptionPadding.OaepSHA256);
        var decryptedMessage = Encoding.UTF8.GetString(decryptedBytes);

        return decryptedMessage;
    }

    public string GenerateKey()
    {
        using var rsa = RSA.Create();
        rsa.KeySize = KeySize;

        var key = rsa.ExportParameters(true);
        var privateKey = ExportPrivateKey(key);

        return privateKey;
    }

    private string ExportPrivateKey(RSAParameters privateKey)
    {
        var sb = new StringBuilder();

        sb.AppendLine(ConvertToBase64(privateKey.Modulus));
        sb.AppendLine(ConvertToBase64(privateKey.Exponent));
        sb.AppendLine(ConvertToBase64(privateKey.D));
        sb.AppendLine(ConvertToBase64(privateKey.P));
        sb.AppendLine(ConvertToBase64(privateKey.Q));
        sb.AppendLine(ConvertToBase64(privateKey.DP));
        sb.AppendLine(ConvertToBase64(privateKey.DQ));
        sb.AppendLine(ConvertToBase64(privateKey.InverseQ));

        return sb.ToString();
    }

    private string ConvertToBase64(byte[]? data)
    {
        return Convert.ToBase64String(data);
    }
}