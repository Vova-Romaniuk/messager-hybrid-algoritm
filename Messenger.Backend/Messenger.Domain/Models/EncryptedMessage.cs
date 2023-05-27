namespace Messenger.Domain.Models;

public class EncryptedMessage
{
    public EncryptedMessage(string encryptedText, byte[] privateKey, byte[] publicKey)
    {
        EncryptedText = encryptedText;
        PrivateKey = privateKey;
        PublicKey = publicKey;
    }

    public EncryptedMessage() { }

    public string EncryptedText { get; set; }
    public byte[] PrivateKey { get; set; }
    public byte[] PublicKey { get; set; }
}