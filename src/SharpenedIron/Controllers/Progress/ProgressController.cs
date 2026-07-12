using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.IO;
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
        var json = doc?.Data?.ToJson(new JsonWriterSettings { OutputMode = JsonOutputMode.RelaxedExtendedJson }) ?? "null";
        return Content("{\"data\":" + json + "}", "application/json");
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromBody] ProgressPayload payload, CancellationToken ct)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();

        // System.Text.Json binds `data` as JsonElement, which the Mongo driver
        // cannot serialize — round-trip through raw JSON into a BsonDocument.
        var bson = payload.Data is { ValueKind: JsonValueKind.Object } el
            ? BsonDocument.Parse(el.GetRawText())
            : null;
        if (bson == null) return BadRequest(new { error = "data must be a JSON object" });

        var filter = Builders<UserProgress>.Filter.Eq(p => p.UserId, userId);
        var update = Builders<UserProgress>.Update
            .Set(p => p.Data, bson)
            .Set(p => p.UpdatedAt, DateTime.UtcNow)
            .SetOnInsert(p => p.UserId, userId);

        await _progress.UpdateOneAsync(filter, update, new UpdateOptions { IsUpsert = true }, ct);
        return Ok();
    }

    private string? GetUserId() =>
        User.FindFirstValue("oid")
        ?? User.FindFirstValue("http://schemas.microsoft.com/identity/claims/objectidentifier")
        ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
}

public class UserProgress
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string UserId { get; set; } = "";
    public BsonDocument? Data { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class ProgressPayload
{
    public JsonElement Data { get; set; }
}
