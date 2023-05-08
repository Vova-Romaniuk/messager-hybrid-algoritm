using Messenger.Application.Services;
using Messenger.Core.Interfaces;

var asymmetricEncryptionService = new AsymmetricEncryptionService();
ISymmetricEncryptionService symmetricEncryptionService = new SymmetricEncryptionService();

// Створення гібридного сервісу з використанням інстансів інших сервісів
var hybridService = new HybridEncryptionService(asymmetricEncryptionService, symmetricEncryptionService);

// Згенерувати ключі
var publicKey = asymmetricEncryptionService.GenerateKey();
var privateKey = asymmetricEncryptionService.GenerateKey();

// Повідомлення для шифрування
string message = "Maks and Vova";

// Шифрування повідомлення
string encryptedMessage = hybridService.Encrypt(message, publicKey);
Console.WriteLine("Зашифроване повідомлення: " + encryptedMessage);

// Розшифрування повідомлення
string decryptedMessage = hybridService.Decrypt(encryptedMessage, privateKey);
Console.WriteLine("Розшифроване повідомлення: " + decryptedMessage);