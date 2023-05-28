using MediatR;
using Messenger.Application.Commands;
using Messenger.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Messenger.Backend.ChatHub;

[Authorize]
public class HubContext : Hub
{
    private readonly IDictionary<string, string> _connections = new Dictionary<string, string>();
    private readonly IMediator _mediator;
    private readonly ISecurityContext _securityContext;

    public HubContext(IMediator mediator, ISecurityContext securityContext)
    {
        _mediator = mediator;
        _securityContext = securityContext;
    }

    private async Task JoinRoom(string chatId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, chatId);
        _connections[Context.ConnectionId] = chatId;
        await Clients.Group(chatId).SendAsync("JoinToRoom", "Was connected to room");
        await SendUsersConnected(chatId);
    }

    public async Task SendMessage(Guid chatId, string message)
    {
        if (message.Trim() != string.Empty)
        {
            var currentUserId = _securityContext.GetCurrentUserId();
            var res = await _mediator.Send(new SendMessageCommand(message, chatId, currentUserId));
            await Clients.Group(chatId.ToString()).SendAsync("ReceiveMessage", res);
        }
    }

    public async Task JoinToUsersRooms(List<string> chatsIds)
    {
        foreach (var item in chatsIds)
        {
            await JoinRoom(item);
        }
    }

    public async Task UserSeenMessages(Guid roomId, Guid userId)
    {
        await Clients.Group(roomId.ToString()).SendAsync("SeenMessages", new { roomId, userId });
    }

    private Task SendUsersConnected(string chatId)
    {
        var users = _connections.Values.Where(x => x == chatId);
        return Clients.Group(chatId).SendAsync("UsersInRoom", users);
    }
}