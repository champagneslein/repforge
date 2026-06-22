public class RegisterRequest
{
    [Required]
    [StringLength(256, MinimumLength=6)]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [StringLength(256, MinimumLength=6)]
    public string Password { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }
}

public class LoginRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [StringLength(256, MinimumLength=6)]
    public string Password { get; set; }
}

public class TokenResponse
{
    public string? AccessToken { get; set; }

    public string? RefreshToken { get; set; }

    public DateTime ExpiresAt { get; set; }
}

public class UserProfile
{
    public int Id { get; set; }

    public string Email { get; set; }
    
    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? ProfilePictureUrl { get; set; }
}
