using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

public class JwtRegisteredClaimNames
{
    public const string Sub = "sub";
    public const string Email = "email";
    public const string Name = "name";
    public const string Iss = "iss";
    public const string Iat = "iat";
    public const string Exp = "exp";
    public const string Sid = "sid";
    public const string Jti = "jti";
}

public class Token
{
    public string? AccessToken { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime ExpiresAt { get; set; }

    public static Token Create(Token other) => new Token
    {
        AccessToken = other.AccessToken,
        RefreshToken = other.RefreshToken,
        ExpiresAt = other.ExpiresAt
    };
}

public class RefreshTokenRequest
{
    public string? RefreshToken { get; set; }
}

public class ChangePasswordRequest
{
    [Required]
    public string OldPassword { get; set; }

    [Required]
    [StringLength(256, MinimumLength=6)]
    public string NewPassword { get; set; }
}

public class RefreshTokenClaims : Token
{
    public string? AccessTokenClaim { get; set; }
    public string? RefreshTokenClaim { get; set; }
    public DateTime ExpiresAtClaim { get; set; }
    public DateTime IssuedAt { get; set; }
}

public class RefreshTokenContext
{
    public string? AccessToken { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime ExpiresAt { get; set; }
}
