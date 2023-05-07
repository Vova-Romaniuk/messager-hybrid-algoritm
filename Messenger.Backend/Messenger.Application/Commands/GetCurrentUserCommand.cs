using MediatR;
using Messenger.Core.Models;

namespace Messenger.Application.Commands;

public class GetCurrentUserCommand : IRequest<UserDto>
{
}