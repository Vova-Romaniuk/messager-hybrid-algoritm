using Messenger.Application.Services;

var hybridService = new CamelliaAesService();

var res = hybridService.Encrypt("Привіт привіт привіт");

var message = hybridService.Decrypt(res);

Console.WriteLine(message);

