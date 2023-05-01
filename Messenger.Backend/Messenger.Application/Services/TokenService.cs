using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Messenger.Core.Configurations;
using Messenger.Core.Entities;
using Messenger.Core.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace Messenger.Application.Services;

public class TokenService : ITokenService
{
    private readonly JwtConfiguration _jwtConfiguration;

    public TokenService(JwtConfiguration jwtConfiguration)
    {
        _jwtConfiguration = jwtConfiguration;
    }

    public string GenerateAccessToken(User user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfiguration.Key));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        var claims = GetClaims(user);
        var token = new JwtSecurityToken(
            _jwtConfiguration.Issuer,
            _jwtConfiguration.Audience,
            claims,
            expires: DateTime.Now.AddMinutes(30000),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public UserToken GenerateRefreshToken()
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);

        return new UserToken
        {
            Token = Convert.ToBase64String(randomNumber),
            Expires = DateTime.Now.AddDays(7),
            Created = DateTime.Now,
        };
    }

    private static IEnumerable<Claim> GetClaims(User user)
    {
        var claims = new List<Claim> {new Claim(ClaimTypes.Name, $"{user.Id}")};

        return claims;
    }
}