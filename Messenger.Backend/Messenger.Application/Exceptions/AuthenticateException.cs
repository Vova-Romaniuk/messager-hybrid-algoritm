namespace Messenger.Application.Exceptions;

public class AuthenticateException : Exception
{
    public AuthenticateException(string message) : base(message) { }
}