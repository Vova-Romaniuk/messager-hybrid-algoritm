using MediatR;
using Messenger.Application.Commands;
using Messenger.Domain.Enums;
using Messenger.Domain.Interfaces;
using Messenger.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Messenger.Backend.ChatHub
{
    [Authorize]
    public class HubContext : Hub
    {
        private readonly IDictionary<string, string> _connections = new Dictionary<string, string>();
        private readonly IMediator _mediator;
        private readonly IMessageService _messageService;
        private readonly ISecurityContext _securityContext;
        private readonly object _connectionsLock = new object();

        public HubContext(IMediator mediator, ISecurityContext securityContext, IMessageService messageService)
        {
            _mediator = mediator;
            _securityContext = securityContext;
            _messageService = messageService;
        }

        private async Task JoinRoom(string chatId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, chatId);
            lock (_connectionsLock)
            {
                _connections[Context.ConnectionId] = chatId;
            }

            await Clients.Group(chatId).SendAsync("JoinToRoom", "Was connected to room");
            await SendUsersConnected(chatId);
        }

        public async Task SendMessage(Guid chatId, string message, TypeEncryption typeEncryption)
        {
            if (message.Trim() != string.Empty)
            {
                var currentUserId = _securityContext.GetCurrentUserId();

                var messageDto = new MessageDto
                {
                    Id = Guid.NewGuid(),
                    RoomId = chatId,
                    Text = message,
                    User = await _mediator.Send(new GetCurrentUserCommand()),
                    When = new DateTimeOffset(DateTime.Now, TimeZoneInfo.FindSystemTimeZoneById("Europe/Kiev").GetUtcOffset(DateTime.Now)),
                };

                await Clients.Group(chatId.ToString()).SendAsync("ReceiveMessage", messageDto);

                await Task.Run(() => _messageService.Send(chatId, currentUserId, message, typeEncryption));
            }
        }

        public async Task JoinToUsersRooms(List<string> chatsIds)
        {
            foreach (var item in chatsIds)
            {
                await JoinRoom(item);
            }
        }

        public async Task LeaveFromUsersRooms(List<string> chatsIds)
        {
            foreach (var item in chatsIds)
            {
                await LeaveRoom(item);
            }
        }

        public async Task LeaveFromAllRooms()
        {
            var chatIds = _connections.Values.Distinct().ToList();
            foreach (var chatId in chatIds)
            {
                await LeaveRoom(chatId);
            }
        }

        private Task SendUsersConnected(string chatId)
        {
            lock (_connectionsLock)
            {
                var users = _connections.Values.Where(x => x == chatId);
                return Clients.Group(chatId).SendAsync("UsersInRoom", users);
            }
        }

        private async Task LeaveRoom(string chatId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, chatId);
            lock (_connectionsLock)
            {
                _connections.Remove(Context.ConnectionId);
            }
        }
    }
}
