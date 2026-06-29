using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;

public interface ITokenService
{
    Task<TokenResponse> GenerateTokenAsync(ApplicationUser user, CancellationToken cancellationToken = default);
    Task<TokenResponse> RefreshAccessTokenAsync(string? refreshToken, CancellationToken cancellationToken = default);
}

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;

    public TokenService(IConfiguration config)
    {
        _config = config;
    }

    public Task<TokenResponse> GenerateTokenAsync(ApplicationUser user, CancellationToken cancellationToken = default)
    {
        var now = DateTime.UtcNow;
        var expires = now.AddMinutes(_config.GetValue("Tokens:AccessTokenMinutes", 60));
        var jwtKey = _config["Tokens:JwtKey"]
            ?? throw new InvalidOperationException("Tokens:JwtKey must be configured.");

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id),
            new(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
            new(ClaimTypes.NameIdentifier, user.Id),
            new(ClaimTypes.Email, user.Email ?? string.Empty),
            new("tenant_id", user.TenantId ?? "repforge")
        };

        if (!string.IsNullOrWhiteSpace(user.FirstName))
        {
            claims.Add(new Claim("given_name", user.FirstName));
        }

        if (!string.IsNullOrWhiteSpace(user.LastName))
        {
            claims.Add(new Claim("family_name", user.LastName));
        }

        var credentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            SecurityAlgorithms.HmacSha256);

        var jwt = new JwtSecurityToken(
            issuer: _config["Tokens:Issuer"] ?? "RepForge",
            audience: _config["Tokens:Audience"] ?? "RepForge",
            expires: expires,
            notBefore: now,
            claims: claims,
            signingCredentials: credentials);

        var response = new TokenResponse
        {
            AccessToken = new JwtSecurityTokenHandler().WriteToken(jwt),
            ExpiresAt = expires,
            RefreshToken = GenerateRefreshToken(),
            UserId = user.Id,
            Email = user.Email
        };

        return Task.FromResult(response);
    }

    public Task<TokenResponse> RefreshAccessTokenAsync(string? refreshToken, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException("Refresh tokens need server-side storage before they can be safely enabled.");
    }

    private static string GenerateRefreshToken()
    {
        return Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
    }
}
