using System.Security.Cryptography;
using System.Text;
using Messenger.Core.Interfaces;

namespace Messenger.Application.Services;

public class SymmetricEncryptionService : ISymmetricEncryptionService
{
    private const int KeySize = 256;

    public string EncryptWithKey(string message, string key)
    {
        var keyBytes = Convert.FromBase64String(key);
        var iv = GenerateIV();

        var messageBytes = Encoding.UTF8.GetBytes(message);
        using var aes = Aes.Create();
        aes.KeySize = KeySize;
        aes.Key = keyBytes;
        aes.IV = iv;

        using var encryptor = aes.CreateEncryptor();
        var encryptedBytes = encryptor.TransformFinalBlock(messageBytes, 0, messageBytes.Length);
        var combinedBytes = new byte[iv.Length + encryptedBytes.Length];
        Array.Copy(iv, combinedBytes, iv.Length);
        Array.Copy(encryptedBytes, 0, combinedBytes, iv.Length, encryptedBytes.Length);

        var encryptedMessage = Convert.ToBase64String(combinedBytes);
        return encryptedMessage;
    }

    public string DecryptWithKey(string encryptedMessage, string key)
    {
        var keyBytes = Convert.FromBase64String(key);
        var encryptedBytes = Convert.FromBase64String(encryptedMessage);
        var iv = new byte[16];
        Array.Copy(encryptedBytes, iv, iv.Length);

        using var aes = Aes.Create();
        aes.KeySize = KeySize;
        aes.Key = keyBytes;
        aes.IV = iv;

        using var decrypted = aes.CreateDecryptor();
        var encryptedMessageBytes = new byte[encryptedBytes.Length - iv.Length];
        Array.Copy(encryptedBytes, iv.Length, encryptedMessageBytes, 0, encryptedMessageBytes.Length);

        var decryptedBytes =
            decrypted.TransformFinalBlock(encryptedMessageBytes, 0, encryptedMessageBytes.Length);
        var decryptedMessage = Encoding.UTF8.GetString(decryptedBytes);
        return decryptedMessage;
    }

    public string GenerateKey()
    {
        using var aes = Aes.Create();
        aes.KeySize = KeySize;
        aes.GenerateKey();
        var keyBytes = aes.Key;
        var key = Convert.ToBase64String(keyBytes);
        return key;
    }

    private byte[] GenerateIV()
    {
        using var rng = RandomNumberGenerator.Create();
        var iv = new byte[16];
        rng.GetBytes(iv);
        return iv;
    }
}