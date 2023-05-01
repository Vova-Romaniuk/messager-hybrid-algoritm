using MediatR;
using Messenger.Core.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace Messenger.Backend.ChatHub;

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
}