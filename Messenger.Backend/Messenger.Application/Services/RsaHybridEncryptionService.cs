using System.Text;
using Messenger.Core.Interfaces;
using Messenger.Core.Models;
using Org.BouncyCastle.Asn1;
using Org.BouncyCastle.Asn1.Pkcs;
using Org.BouncyCastle.Asn1.X509;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Encodings;
using Org.BouncyCastle.Crypto.Engines;
using Org.BouncyCastle.Pkcs;
using Org.BouncyCastle.Security;
using Org.BouncyCastle.X509;
using Utf8Json;

namespace Messenger.Application.Services;

public class RsaHybridEncryptionService : ICryptoService
{
    private readonly IAsymmetricBlockCipher _cipher;

    public RsaHybridEncryptionService()
    {
        _cipher = new Pkcs1Encoding(new RsaEngine());
    }

    public EncryptedMessage Encrypt(string message)
    {
        var keyGenerationParameters = new KeyGenerationParameters(new SecureRandom(), 2048);
        var keyPairGenerator = GeneratorUtilities.GetKeyPairGenerator("RSA");

        keyPairGenerator.Init(keyGenerationParameters);
        var keyPair = keyPairGenerator.GenerateKeyPair();

        _cipher.Init(true, keyPair.Public);
        var encryptedBytes =
            _cipher.ProcessBlock(Encoding.UTF8.GetBytes(message), 0, Encoding.UTF8.GetBytes(message).Length);

        var encryptedMessage = new EncryptedMessage
        {
            EncryptedText = Convert.ToBase64String(encryptedBytes),
            PrivateKey = SerializePrivateKey(keyPair.Private),
            PublicKey = SerializePublicKey(keyPair.Public)
        };

        return encryptedMessage;
    }

    public string Decrypt(EncryptedMessage encryptedMessage)
    {
        _cipher.Init(false, DeserializePrivateKey(encryptedMessage.PrivateKey));
        var encryptedBytes = Convert.FromBase64String(encryptedMessage.EncryptedText);
        var decryptedBytes = _cipher.ProcessBlock(encryptedBytes, 0, encryptedBytes.Length);

        var decryptedString = Encoding.UTF8.GetString(decryptedBytes);

        return decryptedString;
    }

    private static byte[] SerializePrivateKey(AsymmetricKeyParameter privateKey)
    {
        var privateKeyInfo = PrivateKeyInfoFactory.CreatePrivateKeyInfo(privateKey);
        return privateKeyInfo.ToAsn1Object().GetEncoded();
    }

    private static byte[] SerializePublicKey(AsymmetricKeyParameter publicKey)
    {
        var publicKeyInfo = SubjectPublicKeyInfoFactory.CreateSubjectPublicKeyInfo(publicKey);
        return publicKeyInfo.ToAsn1Object().GetEncoded();
    }

    private static AsymmetricKeyParameter DeserializePrivateKey(byte[] privateKeyBytes)
    {
        var privateKeyInfo = PrivateKeyInfo.GetInstance(Asn1Object.FromByteArray(privateKeyBytes));
        return PrivateKeyFactory.CreateKey(privateKeyInfo);
    }

    private static AsymmetricKeyParameter DeserializePublicKey(byte[] publicKeyBytes)
    {
        var publicKeyInfo = SubjectPublicKeyInfo.GetInstance(Asn1Object.FromByteArray(publicKeyBytes));
        return PublicKeyFactory.CreateKey(publicKeyInfo);
    }
}