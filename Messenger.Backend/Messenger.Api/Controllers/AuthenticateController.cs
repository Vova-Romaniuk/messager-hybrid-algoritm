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
            var result = await _mediator.Send(new AuthenticateCommand(viewModel.Email, viewModel.Password));
            HttpContext.SetTokenCookie(result);
            return Ok(new { Token = result.JwtToken });
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
            var result = await _mediator.Send(new RegistrationCommand(
                viewModel.Email,
                viewModel.Password,
                viewModel.UserName));

            HttpContext.SetTokenCookie(result);
            return StatusCode( StatusCodes.Status201Created ,new { Token = result.JwtToken });
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