using MediatR;
using Messenger.Application.Commands;
using Messenger.Application.Exceptions;
using Messenger.Backend.Extensions;
using Messenger.Backend.ViewModels;
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
    public async Task<IActionResult> AuthenticateAsync([FromBody] AuthenticateViewModel viewModel)
    {
        try
        {
            var (email, password) = viewModel;
            var result = await _mediator.Send(new AuthenticateCommand(email, password));
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

    [HttpPost("google")]
    public async Task<IActionResult> GoogleLoginAsync(GoogleAuthViewModel viewModel)
    {
        try
        {
            var result = await _mediator.Send(new GoogleAuthCommand(
                viewModel.Email,
                viewModel.Picture,
                viewModel.FullName));

            HttpContext.SetTokenCookie(result);
            return StatusCode( StatusCodes.Status200OK ,new { Token = result.JwtToken });
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