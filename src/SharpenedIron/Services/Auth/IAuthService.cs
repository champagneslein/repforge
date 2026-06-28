public interface IAuthService
{
    Task<TokenResponse> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken = default);

    Task<TokenResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default);

    Task<bool> LogoutAsync(string? userId, CancellationToken cancellationToken = default);

    Task<TokenResponse> RefreshTokenAsync(string? refreshToken, CancellationToken cancellationToken = default);

    Task<UserProfile> GetProfileAsync(string? userId, CancellationToken cancellationToken = default);

    Task ChangePasswordAsync(string? userId, string oldPassword, string newPassword, CancellationToken cancellationToken = default);
}
