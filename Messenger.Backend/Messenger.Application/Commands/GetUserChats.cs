using MediatR;
using Messenger.Core.Models;

namespace Messenger.Application.Commands;

public class GetUserChats : IRequest<IEnumerable<RoomDto>>
{
}