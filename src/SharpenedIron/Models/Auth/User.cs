using System.ComponentModel.DataAnnotations;

public class RegisterRequest
{
    [Required]
    [StringLength(256, MinimumLength=6)]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    [StringLength(256, MinimumLength=8)]
    public required string Password { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }
}

public class LoginRequest
{
    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    [StringLength(256, MinimumLength=8)]
    public required string Password { get; set; }
}

public class RefreshTokenRequest
{
    public string? RefreshToken { get; set; }
}

public class ChangePasswordRequest
{
    [Required]
    public required string OldPassword { get; set; }

    [Required]
    [StringLength(256, MinimumLength=8)]
    public required string NewPassword { get; set; }
}

public class TokenResponse
{
    public string? AccessToken { get; set; }

    public string? RefreshToken { get; set; }

    public DateTime ExpiresAt { get; set; }
}

public class UserProfile
{
    public string? Id { get; set; }

    public string? Email { get; set; }
    
    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? ProfilePictureUrl { get; set; }
}
