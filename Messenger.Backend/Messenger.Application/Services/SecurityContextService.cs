using System.Security.Claims;
using Messenger.Domain.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Messenger.Application.Services;

public class SecurityContextService : ISecurityContext
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public SecurityContextService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public Guid GetCurrentUserId()
    {
        var guidClaim = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.Name);

        if (guidClaim == null || !Guid.TryParse(guidClaim.Value, out var result))
        {
            throw new Exception("User not found");
        }

        return result;
    }
}