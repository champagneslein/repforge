[ApiController]
[Route("api/[controller]")]
[Authorize] // Remove this for public auth endpoints
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// Register a new user
    /// </summary>
    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync(RegisterRequest request)
    {
        try
        {
            var tokenResponse = await _authService.RegisterAsync(request);
            return Ok(tokenResponse);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { Error = ex.Message });
        }
    }

    /// <summary>
    /// Login an existing user
    /// </summary>
    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync(LoginRequest request)
    {
        try
        {
            var tokenResponse = await _authService.LoginAsync(request);
            return Ok(tokenResponse);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { Error = ex.Message });
        }
    }

    /// <summary>
    /// Logout the current user
    /// </summary>
    [HttpPost("logout")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> LogoutAsync()
    {
        // Get authenticated user from ClaimsPrincipal
        var userId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
        await _authService.LogoutAsync(userId);

        return Ok(new { Message = "Logged out successfully" });
    }

    /// <summary>
    /// Refresh access token
    /// </summary>
    [HttpPost("refresh-token")]
    [AllowAnonymous] // Requires refresh token in Authorization header
    public async Task<IActionResult> RefreshTokenAsync([FromBody] RefreshTokenRequest request)
    {
        try
        {
            var tokenResponse = await _authService.RefreshTokenAsync(request.RefreshToken);
            return Ok(tokenResponse);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { Error = ex.Message });
        }
    }

    /// <summary>
    /// Get current user profile
    /// </summary>
    [HttpGet("profile")]
    public async Task<IActionResult> GetProfileAsync()
    {
        var userId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
        try
        {
            var profile = await _authService.GetProfileAsync(userId);
            return Ok(profile);
        }
        catch (InvalidOperationException ex)
        {
            return Unauthorized(new { Error = ex.Message });
        }
    }

    /// <summary>
    /// Change password
    /// </summary>
    [HttpPost("change-password")]
    [Authorize]
    public async Task<IActionResult> ChangePasswordAsync([FromBody] ChangePasswordRequest request)
    {
        try
        {
            await _authService.ChangePasswordAsync(
                User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value,
                request.OldPassword,
                request.NewPassword);

            return Ok(new { Message = "Password changed successfully" });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { Error = ex.Message });
        }
    }
}
