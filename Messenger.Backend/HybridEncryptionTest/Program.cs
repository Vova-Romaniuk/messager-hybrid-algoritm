using Messenger.Application.Services;

var hybridService = new DhCryptoService();

var res = hybridService.Encrypt("Привіт привіт привіт");

var message = hybridService.Decrypt(res);

Console.WriteLine(message);

