using System.Text;
using Messenger.Domain.Interfaces;
using Messenger.Domain.Models;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Generators;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Pkcs;
using Org.BouncyCastle.Security;
using Org.BouncyCastle.X509;

namespace Messenger.Application.Services;

public class DHCryptoService : ICryptoService
{
    public EncryptedMessage Encrypt(string message)
    {
        var keyPair = GenerateKeyPair();

        var encryptedBytes = EncryptMessage(message, keyPair.Public);
        return new EncryptedMessage(Convert.ToBase64String(encryptedBytes), GetPrivateKeyBytes(keyPair.Private), GetPublicKeyBytes(keyPair.Public));
    }

    public string Decrypt(EncryptedMessage encryptedMessage)
    {
        var encryptedBytes = Convert.FromBase64String(encryptedMessage.EncryptedText);
        var privateKey = GetPrivateKey(encryptedMessage.PrivateKey);
        var decryptedBytes = DecryptMessage(encryptedBytes, privateKey);
        return Encoding.UTF8.GetString(decryptedBytes);
    }

    private AsymmetricCipherKeyPair GenerateKeyPair()
    {
        var generator = new DHParametersGenerator();
        generator.Init(2048, 100, new SecureRandom());
        var parameters = generator.GenerateParameters();

        var keyPairGenerator = new DHKeyPairGenerator();
        keyPairGenerator.Init(new DHKeyGenerationParameters(new SecureRandom(), parameters));
        return keyPairGenerator.GenerateKeyPair();
    }

    private byte[] EncryptMessage(string message, AsymmetricKeyParameter publicKey)
    {
        var messageBytes = Encoding.UTF8.GetBytes(message);

        var agreement = AgreementUtilities.GetBasicAgreement("DH");
        agreement.Init(new ParametersWithRandom(publicKey, new SecureRandom()));
        var sharedSecret = agreement.CalculateAgreement(publicKey);

        var key = new KeyParameter(sharedSecret.ToByteArray());
        var cipher = CipherUtilities.GetCipher("AES/ECB/PKCS7Padding");
        cipher.Init(true, key);
        var encryptedBytes = cipher.DoFinal(messageBytes);

        return encryptedBytes;
    }

    private byte[] DecryptMessage(byte[] encryptedBytes, AsymmetricKeyParameter privateKey)
    {
        var agreement = AgreementUtilities.GetBasicAgreement("DH");
        agreement.Init(new ParametersWithRandom(privateKey, new SecureRandom()));
        var sharedSecret = agreement.CalculateAgreement(privateKey);

        var key = new KeyParameter(sharedSecret.ToByteArray());
        var cipher = CipherUtilities.GetCipher("AES/ECB/PKCS7Padding");
        cipher.Init(false, key);
        var decryptedBytes = cipher.DoFinal(encryptedBytes);

        return decryptedBytes;
    }

    private byte[] GetPrivateKeyBytes(AsymmetricKeyParameter privateKey)
    {
        return PrivateKeyInfoFactory.CreatePrivateKeyInfo(privateKey).GetDerEncoded();
    }

    private byte[] GetPublicKeyBytes(AsymmetricKeyParameter publicKey)
    {
        var publicKeyInfo = SubjectPublicKeyInfoFactory.CreateSubjectPublicKeyInfo(publicKey);
        return publicKeyInfo.GetEncoded();
    }

    private AsymmetricKeyParameter GetPrivateKey(byte[] privateKeyBytes)
    {
        return PrivateKeyFactory.CreateKey(privateKeyBytes);
    }
}