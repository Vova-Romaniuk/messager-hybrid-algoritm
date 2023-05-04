using MediatR;
using Messenger.Application.Commands;
using Messenger.Application.Exceptions;
using Messenger.Backend.Extensions;
using Messenger.Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Messenger.Backend.Controllers;

[ApiController]
[Route("user")]
public class UserController : ControllerBase
{
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            return Ok(await _mediator.Send(new GetCurrentUserCommand()));
        }
        catch (NotFoundException e)
        {
            return NotFound(new ErrorResponseModel("Користувача не знайдено!"));
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

}