using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProgressController : ControllerBase
{
    private readonly IMongoCollection<UserProgress> _progress;

    public ProgressController(IMongoDatabase db)
    {
        _progress = db.GetCollection<UserProgress>("progress");
        _progress.Indexes.CreateOne(new CreateIndexModel<UserProgress>(
            Builders<UserProgress>.IndexKeys.Ascending(p => p.UserId),
            new CreateIndexOptions { Unique = true }));
    }

    [HttpGet]
    public async Task<IActionResult> Get(CancellationToken ct)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();

        var doc = await _progress.Find(p => p.UserId == userId).FirstOrDefaultAsync(ct);
        return Ok(new { data = doc?.Data });
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromBody] ProgressPayload payload, CancellationToken ct)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();

        var filter = Builders<UserProgress>.Filter.Eq(p => p.UserId, userId);
        var update = Builders<UserProgress>.Update
            .Set(p => p.Data, payload.Data)
            .Set(p => p.UpdatedAt, DateTime.UtcNow)
            .SetOnInsert(p => p.UserId, userId);

        await _progress.UpdateOneAsync(filter, update, new UpdateOptions { IsUpsert = true }, ct);
        return Ok();
    }

    private string? GetUserId() =>
        User.FindFirstValue(JwtRegisteredClaimNames.Sub)
        ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
}

public class UserProgress
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string UserId { get; set; } = "";
    public object? Data { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class ProgressPayload
{
    public object? Data { get; set; }
}
