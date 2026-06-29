using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CallTokenController : ControllerBase
{
    private static readonly HttpClient _http = new();
    private readonly IConfiguration _config;

    public CallTokenController(IConfiguration config) => _config = config;

    [HttpGet]
    public async Task<IActionResult> GetToken(CancellationToken ct)
    {
        var apiKey = _config["ElevenLabs:ApiKey"];
        if (string.IsNullOrWhiteSpace(apiKey))
            return StatusCode(503, new { error = "ElevenLabs API key not configured" });

        const string agentId = "agent_9601kw8ekb86ex0abgh5vr8kh4xe";

        using var request = new HttpRequestMessage(
            HttpMethod.Post,
            $"https://api.elevenlabs.io/v1/convai/conversation/token?agent_id={agentId}");
        request.Headers.Add("xi-api-key", apiKey);

        var response = await _http.SendAsync(request, ct);
        if (!response.IsSuccessStatusCode)
            return StatusCode((int)response.StatusCode, new { error = "ElevenLabs token request failed" });

        var json = await response.Content.ReadAsStringAsync(ct);
        return Content(json, "application/json");
    }
}
