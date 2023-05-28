using System.Text;
using Messenger.Domain.Interfaces;
using Messenger.Domain.Models;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Engines;
using Org.BouncyCastle.Crypto.Modes;
using Org.BouncyCastle.Crypto.Paddings;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Security;

namespace Messenger.Application.Services;

public class CamelliaAesService : ICryptoService
{
    private const int KeySizeInBytes = 32;

    public EncryptedMessage Encrypt(string message)
    {
        var plainTextBytes = Encoding.UTF8.GetBytes(message);

        var random = new SecureRandom();
        var camelliaKey = new byte[KeySizeInBytes];
        random.NextBytes(camelliaKey);
        var encryptedTextBytes = PerformCamelliaEncryption(camelliaKey, plainTextBytes);

        return new EncryptedMessage
        {
            EncryptedText = Convert.ToBase64String(encryptedTextBytes),
            PrivateKey = camelliaKey,
            PublicKey = null
        };
    }

    public string Decrypt(EncryptedMessage encryptedMessage)
    {
        var encryptedTextBytes = Convert.FromBase64String(encryptedMessage.EncryptedText);
        var camelliaKey = encryptedMessage.PrivateKey;

        var decryptedTextBytes = PerformCamelliaDecryption(camelliaKey, encryptedTextBytes);

        var decryptedText = Encoding.UTF8.GetString(decryptedTextBytes);
        return decryptedText;
    }

    private byte[] PerformCamelliaEncryption(byte[] key, byte[] inputBytes)
    {
        var camelliaEngine = new CamelliaEngine();
        BufferedBlockCipher camelliaCipher = new PaddedBufferedBlockCipher(new CbcBlockCipher(camelliaEngine), new Pkcs7Padding());
        var camelliaKeyParameter = new KeyParameter(key);

        camelliaCipher.Init(true, new ParametersWithIV(camelliaKeyParameter, new byte[camelliaCipher.GetBlockSize()]));
        var outputBytes = new byte[camelliaCipher.GetOutputSize(inputBytes.Length)];

        var length = camelliaCipher.ProcessBytes(inputBytes, 0, inputBytes.Length, outputBytes, 0);
        camelliaCipher.DoFinal(outputBytes, length);

        return outputBytes;
    }

    private byte[] PerformCamelliaDecryption(byte[] key, byte[] inputBytes)
    {
        var camelliaEngine = new CamelliaEngine();
        BufferedBlockCipher camelliaCipher = new PaddedBufferedBlockCipher(new CbcBlockCipher(camelliaEngine), new Pkcs7Padding());
        var camelliaKeyParameter = new KeyParameter(key);

        camelliaCipher.Init(false, new ParametersWithIV(camelliaKeyParameter, new byte[camelliaCipher.GetBlockSize()]));
        var outputBytes = new byte[camelliaCipher.GetOutputSize(inputBytes.Length)];

        var length = camelliaCipher.ProcessBytes(inputBytes, 0, inputBytes.Length, outputBytes, 0);
        camelliaCipher.DoFinal(outputBytes, length);

        return outputBytes;
    }
}