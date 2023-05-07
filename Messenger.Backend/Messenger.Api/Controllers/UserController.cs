using MediatR;
using Messenger.Application.Commands;
using Messenger.Application.Exceptions;
using Messenger.Backend.Extensions;
using Messenger.Backend.ViewModels;
using Messenger.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Messenger.Backend.Controllers;

[Authorize]
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
    public async Task<IActionResult> GetAsync()
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

    [HttpPut]
    public async Task<IActionResult> PutAsync(UpdateUserViewModel viewModel)
    {
        try
        {
            await _mediator.Send(new UpdateUserCommand(new UserDto()
            {
                UserName = viewModel.UserName,
                FullName = viewModel.FullName,
                Description = viewModel.Description,
                Email = viewModel.Email
            }));
            return Ok();
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

    [HttpPatch]
    public async Task<IActionResult> PatchAsync(ImageViewModel viewModel)
    {
        try
        {
            await _mediator.Send(new UpdateAvatarCommand(viewModel.Image));
            return Ok();
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