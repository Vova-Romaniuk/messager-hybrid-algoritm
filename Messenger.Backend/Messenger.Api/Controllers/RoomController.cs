using MediatR;
using Messenger.Application.Commands;
using Messenger.Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Messenger.Backend.Controllers;

public class RoomController : ControllerBase
{
    private readonly IMediator _mediator;

    public RoomController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> CreateAsync([FromBody] RoomViewModel roomViewModel)
    {
        try
        {
            var (title, enumerable, image) = roomViewModel;
            var roomId = await _mediator.Send(new CreateRoomCommand(title, enumerable, image));

            return Ok(roomId);
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }
}