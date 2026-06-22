public interface ITokenService
{
    Task<TokenResponse> GenerateTokenAsync(ApplicationUser user, CancellationToken cancellationToken = default);
    Task<TokenResponse> RefreshAccessTokenAsync(string refreshToken, CancellationToken cancellationToken = default);
}

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;
    private readonly SymmetricKeyCredential _jwtKey;

    public TokenService(IConfiguration config)
    {
        _config = config;
        var key = _config["Tokens:JwtKey"] ?? "YourSuperSecretKeyThatIsAtLeast32CharactersLong!";
        _jwtKey = new SymmetricKeyCredential(Encoding.UTF8.GetBytes(key));
    }

    public async Task<TokenResponse> GenerateTokenAsync(ApplicationUser user, CancellationToken cancellationToken = default)
    {
        // Sign the JWT credential
        var credential = new SystemClaimsIdentity(user.Claims, user.Claims.Count().ToString());

        var now = DateTime.UtcNow;
        var expires = DateTime.UtcNow.AddHours(1); // 1 hour expiration

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("firstName", user.FirstName ?? ""),
            new Claim("lastName", user.LastName ?? "")
        };

        var credentials = new SigningCredentials(_jwtKey, SecurityAlgorithms.HmacSha256);

        var jwt = new JwtSecurityToken(
            issuer: "RepForge",
            audience: "RepForge",
            expires: expires,
            notBefore: now,
            claims: claims,
            signingCredentials: credentials);

        var accessToken = new Token
        {
            AccessToken = new JwtSecurityTokenHandler().WriteToken(jwt),
            ExpiresAt = expires,
            RefreshToken = GenerateRefreshToken()
        };

        return await _dbContext.AddAsync(Token.Create(accessToken), cancellationToken)
            .Result
            .FirstOrDefault();
    }

    public Task<TokenResponse> RefreshAccessTokenAsync(string refreshToken, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrEmpty(refreshToken))
        {
            throw new InvalidOperationException("Invalid refresh token.");
        }

        // Token service implementation would validate refresh token and generate new access token
        // This depends on your database/token storage implementation
        return Task.FromResult<TokenResponse>(null);
    }

    private string GenerateRefreshToken()
    {
        return Guid.NewGuid().ToString("N");
    }
}
