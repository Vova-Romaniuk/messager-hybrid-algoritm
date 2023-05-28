using Messenger.Application.Services;
using Messenger.Domain.Enums;
using Messenger.Domain.Interfaces;

namespace Messenger.Application.Factory;

public class CryptoServiceFactory
{
    public ICryptoService CreateCryptoService(TypeEncryption typeEncryption)
    {
        return typeEncryption switch
        {
            TypeEncryption.Browfish_AES => new BrowfishAesService(),
            TypeEncryption.Camellia_AES => new CamelliaAesService(),
            TypeEncryption.RSA_AES => new RsaHybridEncryptionService(),
            _ => throw new NotSupportedException("Unsupported encryption type.")
        };
    }
}