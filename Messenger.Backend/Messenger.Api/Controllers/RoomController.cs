using MediatR;
using Messenger.Application.Commands;
using Messenger.Backend.ViewModels;
using Messenger.Core.Interfaces;
using Messenger.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Messenger.Backend.Controllers;

[ApiController]
[Route("room")]
[Authorize]
public class RoomController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly ISecurityContext _securityContext;

    public RoomController(IMediator mediator, ISecurityContext securityContext)
    {
        _mediator = mediator;
        _securityContext = securityContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetAsync()
    {
        try
        {
            var rooms = await _mediator.Send(new GetUserChatsCommand());

            return Ok(rooms.Select(MapChatPreview));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetChatByIdAsync(Guid id)
    {
        try
        {
             var room = await _mediator.Send(new GetUserChatCommand(id));

            return Ok(MapChat(room));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateAsync([FromBody] RoomViewModel roomViewModel)
    {
        try
        {
            var roomId = await _mediator.Send(new CreateRoomCommand(roomViewModel.Members));

            return Ok(roomId);
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    private ChatViewModel MapChat(RoomDto roomDto)
    {
        var currentUserId = _securityContext.GetCurrentUserId();

        var recipient = roomDto.Users.First(x => x.Id != currentUserId);

        var chat = new ChatViewModel
        {
            Title = recipient.UserName,
            Id = roomDto.Id,
            Users = roomDto.Users,
            Image = recipient.Image,
            Recipient = recipient,
            Messages = roomDto.Messages,
        };

        return chat;
    }

    private ChatPreviewViewModel MapChatPreview(RoomDto roomDto)
    {
        var currentUserId = _securityContext.GetCurrentUserId();

        var recipient = roomDto.Users.First(x => x.Id != currentUserId);

        var chat = new ChatPreviewViewModel
        {
            Title = recipient.UserName,
            Id = roomDto.Id,
            Users = roomDto.Users,
            Image = recipient.Image,
            Recipient = recipient,
            Message = roomDto.Messages.LastOrDefault()
        };

        return chat;
    }

}