public class AuthService : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly TokenService _tokenService;
    private readonly ITokenService _tokenServiceProxy;

    public AuthService(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        ITokenService tokenService, // or TokenService in production
        ITokenService tokenServiceProxy) // injected based on project structure
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
        _tokenServiceProxy = tokenServiceProxy;
    }

    public async Task<TokenResponse> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken = default)
    {
        // Check if user already exists
        var existingUser = await _userManager.FindByEmailAsync(request.Email);
        if (existingUser != null)
        {
            throw new InvalidOperationException("A user with this email already exists.");
        }

        // Create user
        var user = new ApplicationUser
        {
            Email = request.Email,
            UserName = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            EmailConfirmed = false
        };

        // Register user
        var result = await _userManager.CreateAsync(user, request.Password, cancellationToken);
        if (!result.Succeeded)
        {
            var errors = string.Join("; ", result.Errors.Select(e => e.Description));
            throw new InvalidOperationException($"Registration failed: {errors}");
        }

        // Send email confirmation
        await _userManager.SendEmailConfirmationAsync(user, cancellationToken);

        // Auto sign in user
        await _signInManager.SignInAsync(user, isPersistent: true, cancellationToken);

        // Generate token
        var tokenResponse = await GenerateToken(user);

        return tokenResponse;
    }

    public async Task<TokenResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
        {
            throw new InvalidOperationException("Invalid email or password.");
        }

        var result = await _signInManager.PasswordSignInAsync(
            user, request.Password, 
            isPersistent: false, 
            requireRememberMe: false,
            cancellationToken: cancellationToken);

        if (!result.Succeeded)
        {
            throw new InvalidOperationException("Invalid email or password.");
        }

        return await GenerateTokenAsync(user);
    }

    public async Task<bool> LogoutAsync(string userId, CancellationToken cancellationToken = default)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return false;
        }

        await _signInManager.SignOutAsync(user);
        return true;
    }

    public async Task<TokenResponse> RefreshTokenAsync(string refreshToken, CancellationToken cancellationToken = default)
    {
        // Validate refresh token
        // Check expiration
        // Generate new access token
        
        return await _tokenService.RefreshAccessTokenAsync(refreshToken, cancellationToken);
    }

    public async Task<UserProfile> GetProfileAsync(string userId, CancellationToken cancellationToken = default)
    {
        var user = await _userManager.FindByIdAsync(userId, cancellationToken);
        if (user == null)
        {
            throw new InvalidOperationException("User not found.");
        }

        return new UserProfile
        {
            Id = user.Id,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            ProfilePictureUrl = user.ProfilePictureUrl
        };
    }

    public async Task ChangePasswordAsync(string userId, string oldPassword, string newPassword, CancellationToken cancellationToken = default)
    {
        var user = await _userManager.FindByIdAsync(userId, cancellationToken);
        if (user == null)
        {
            throw new InvalidOperationException("User not found.");
        }

        var result = await _userManager.ChangePasswordAsync(
            user, oldPassword, newPassword, cancellationToken);

        if (!result.Succeeded)
        {
            var errors = string.Join("; ", result.Errors.Select(e => e.Description));
            throw new InvalidOperationException($"Password change failed: {errors}");
        }

        // Re-sign in user
        await _signInManager.SignInAsync(user, isPersistent: true, cancellationToken);
    }

    private async Task<TokenResponse> GenerateTokenAsync(ApplicationUser user)
    {
        return await GenerateToken(user);
    }

    private async Task<TokenResponse> GenerateToken(ApplicationUser user)
    {
        // Implementation depends on your JWT or Bearer token implementation
        return await _tokenService.GenerateTokenAsync(user);
    }
}
