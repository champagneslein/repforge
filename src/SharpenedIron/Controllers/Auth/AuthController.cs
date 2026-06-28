using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> RegisterAsync([FromBody] RegisterRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var tokenResponse = await _authService.RegisterAsync(request, cancellationToken);
            return Ok(tokenResponse);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> LoginAsync([FromBody] LoginRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var tokenResponse = await _authService.LoginAsync(request, cancellationToken);
            return Ok(tokenResponse);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> LogoutAsync(CancellationToken cancellationToken)
    {
        await _authService.LogoutAsync(AuthService.GetUserId(User), cancellationToken);
        return Ok(new { message = "Logged out successfully" });
    }

    [HttpPost("refresh-token")]
    [AllowAnonymous]
    public async Task<IActionResult> RefreshTokenAsync([FromBody] RefreshTokenRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var tokenResponse = await _authService.RefreshTokenAsync(request.RefreshToken, cancellationToken);
            return Ok(tokenResponse);
        }
        catch (NotImplementedException ex)
        {
            return StatusCode(StatusCodes.Status501NotImplemented, new { error = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("profile")]
    [Authorize]
    public async Task<IActionResult> GetProfileAsync(CancellationToken cancellationToken)
    {
        try
        {
            var profile = await _authService.GetProfileAsync(AuthService.GetUserId(User), cancellationToken);
            return Ok(profile);
        }
        catch (InvalidOperationException ex)
        {
            return Unauthorized(new { error = ex.Message });
        }
    }

    [HttpPost("change-password")]
    [Authorize]
    public async Task<IActionResult> ChangePasswordAsync([FromBody] ChangePasswordRequest request, CancellationToken cancellationToken)
    {
        try
        {
            await _authService.ChangePasswordAsync(
                AuthService.GetUserId(User),
                request.OldPassword,
                request.NewPassword,
                cancellationToken);

            return Ok(new { message = "Password changed successfully" });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}
