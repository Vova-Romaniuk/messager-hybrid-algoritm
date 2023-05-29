using MediatR;
using Messenger.Application.Commands;
using Messenger.Domain.Enums;
using Messenger.Domain.Interfaces;
using Messenger.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Messenger.Backend.ChatHub;

[Authorize]
public class HubContext : Hub
{
    private readonly IDictionary<string, string> _connections = new Dictionary<string, string>();
    private readonly IMediator _mediator;
    private readonly IMessageService _messageService;
    private readonly ISecurityContext _securityContext;

    public HubContext(IMediator mediator, ISecurityContext securityContext, IMessageService messageService)
    {
        _mediator = mediator;
        _securityContext = securityContext;
        _messageService = messageService;
    }

    private async Task JoinRoom(string chatId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, chatId);
        _connections[Context.ConnectionId] = chatId;
        await Clients.Group(chatId).SendAsync("JoinToRoom", "Was connected to room");
        await SendUsersConnected(chatId);
    }

    public async Task SendMessage(Guid chatId, string message, TypeEncryption typeEncryption)
    {
        if (message.Trim() != string.Empty)
        {
            var currentUserId = _securityContext.GetCurrentUserId();
            await Clients.Group(chatId.ToString()).SendAsync("ReceiveMessage",  new MessageDto
            {
                Id = Guid.NewGuid(),
                RoomId = chatId,
                Text = message,
                User = await _mediator.Send(new GetUserByIdCommand(currentUserId)),
                When = DateTime.Now,
            });

            var res = await _messageService.Send(chatId, currentUserId, message, typeEncryption);
        }
    }

    public async Task JoinToUsersRooms(List<string> chatsIds)
    {
        foreach (var item in chatsIds)
        {
            await JoinRoom(item);
        }
    }

    private Task SendUsersConnected(string chatId)
    {
        var users = _connections.Values.Where(x => x == chatId);
        return Clients.Group(chatId).SendAsync("UsersInRoom", users);
    }

    /*public override async Task OnDisconnectedAsync(Exception exception)
    {
        if (_connections.TryGetValue(Context.ConnectionId, out var chatId))
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, chatId);
            _connections.Remove(Context.ConnectionId);

            await Clients.Group(chatId).SendAsync("LeaveRoom", "Disconnected from room");
            await SendUsersConnected(chatId);
        }

        await base.OnDisconnectedAsync(exception);
    }*/
}