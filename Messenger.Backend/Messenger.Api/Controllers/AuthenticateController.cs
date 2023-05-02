using MediatR;
using Messenger.Application.Commands;
using Messenger.Application.Exceptions;
using Messenger.Backend.Extensions;
using Messenger.Backend.ViewModels;
using Messenger.Core.Commands;
using Microsoft.AspNetCore.Mvc;

namespace Messenger.Backend.Controllers;

[ApiController]
[Route("authenticate")]
public class AuthenticateController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthenticateController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> AuthenticateAsync(AuthenticateViewModel viewModel)
    {
        try
        {
            var model = await _mediator.Send(new AuthenticateCommand(viewModel.Email, viewModel.Password));
            HttpContext.SetTokenCookie(model);
            return Ok();
        }
        catch (NotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpPost("registration")]
    public async Task<IActionResult> RegistrationAsync(RegistrationViewModel viewModel)
    {
        try
        {
            var model = await _mediator.Send(new RegistrationCommand(
                viewModel.Email,
                viewModel.Password,
                viewModel.UserName));

            HttpContext.SetTokenCookie(model);
            return Ok();
        }
        catch (NotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            return BadRequest(new ErrorResponseModel(e.Message));
        }
    }

    [HttpGet("logout")]
    public IActionResult Logout()
    {
        HttpContext.DeleteRefreshToken();
        return Ok();
    }
}