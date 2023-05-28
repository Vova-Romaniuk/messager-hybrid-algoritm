using System.Text;
using Messenger.Domain.Interfaces;
using Messenger.Domain.Models;
using Org.BouncyCastle.Crypto.Engines;
using Org.BouncyCastle.Crypto.Modes;
using Org.BouncyCastle.Crypto.Paddings;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Security;

namespace Messenger.Application.Services;

public class BrowfishAesService : ICryptoService
{
    private const int BlowfishBlockSize = 8; // Розмір блока шифрування Blowfish в байтах

    public EncryptedMessage Encrypt(string message)
    {
        var key = GenerateRandomKey(32);
        var iv = GenerateRandomIv(BlowfishBlockSize);

        var encrypted = EncryptMessage(Encoding.UTF8.GetBytes(message), key, iv);

        return new EncryptedMessage
        {
            EncryptedText = Convert.ToBase64String(encrypted),
            PrivateKey = key,
            PublicKey = iv
        };
    }

    public string Decrypt(EncryptedMessage encryptedMessage)
    {
        var encrypted = Convert.FromBase64String(encryptedMessage.EncryptedText);

        var decrypted = DecryptMessage(encrypted, encryptedMessage.PrivateKey, encryptedMessage.PublicKey);

        return Encoding.UTF8.GetString(decrypted);
    }

    private static byte[] EncryptMessage(byte[] message, byte[] key, byte[] iv)
    {
        var cipher = new PaddedBufferedBlockCipher(new CbcBlockCipher(new BlowfishEngine()));
        var keyParameter = new KeyParameter(key);
        var parameters = new ParametersWithIV(keyParameter, iv);

        cipher.Init(true, parameters);

        var output = new byte[cipher.GetOutputSize(message.Length)];
        var bytesProcessed = cipher.ProcessBytes(message, 0, message.Length, output, 0);
        cipher.DoFinal(output, bytesProcessed);

        return output;
    }

    private static byte[] DecryptMessage(byte[] encrypted, byte[] key, byte[] iv)
    {
        var cipher = new PaddedBufferedBlockCipher(new CbcBlockCipher(new BlowfishEngine()));
        var keyParameter = new KeyParameter(key);
        var parameters = new ParametersWithIV(keyParameter, iv);

        cipher.Init(false, parameters);

        var output = new byte[cipher.GetOutputSize(encrypted.Length)];
        var bytesProcessed = cipher.ProcessBytes(encrypted, 0, encrypted.Length, output, 0);
        cipher.DoFinal(output, bytesProcessed);

        return output;
    }

    private static byte[] GenerateRandomKey(int sizeInBytes)
    {
        var key = new byte[sizeInBytes];
        var random = new SecureRandom();
        random.NextBytes(key);
        return key;
    }

    private static byte[] GenerateRandomIv(int sizeInBytes)
    {
        var iv = new byte[sizeInBytes];
        var random = new SecureRandom();
        random.NextBytes(iv);
        return iv;
    }
}