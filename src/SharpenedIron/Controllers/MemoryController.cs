using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

// Long-term memory for AI personas: an append-only event log per
// (user, persona) so agents remember everything that happened to them
// in the trainee's simulated world across sessions and channels.
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MemoryController : ControllerBase
{
    private const int MaxEvents = 100;

    private readonly IMongoCollection<PersonaMemory> _memory;

    public MemoryController(IMongoDatabase db)
    {
        _memory = db.GetCollection<PersonaMemory>("personaMemory");
        _memory.Indexes.CreateOne(new CreateIndexModel<PersonaMemory>(
            Builders<PersonaMemory>.IndexKeys.Ascending(m => m.UserId).Ascending(m => m.PersonaId),
            new CreateIndexOptions { Unique = true }));
    }

    [HttpGet("{personaId:int}")]
    public async Task<IActionResult> Get(int personaId, CancellationToken ct)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();

        var doc = await _memory.Find(m => m.UserId == userId && m.PersonaId == personaId).FirstOrDefaultAsync(ct);
        return Ok(new { events = doc?.Events ?? [], summary = doc?.Summary });
    }

    [HttpPost("{personaId:int}")]
    public async Task<IActionResult> Append(int personaId, [FromBody] MemoryAppendPayload payload, CancellationToken ct)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized();
        if (payload.Events is not { Count: > 0 } && payload.Summary is null)
            return BadRequest(new { error = "nothing to append" });

        var now = DateTime.UtcNow;
        var events = (payload.Events ?? []).Select(e => new MemoryEvent
        {
            Type = e.Type ?? "note",
            Day = e.Day,
            Text = e.Text ?? "",
            At = now
        }).ToList();

        var filter = Builders<PersonaMemory>.Filter.Where(m => m.UserId == userId && m.PersonaId == personaId);
        var update = Builders<PersonaMemory>.Update
            .PushEach(m => m.Events, events, slice: -MaxEvents)
            .Set(m => m.UpdatedAt, now)
            .SetOnInsert(m => m.UserId, userId)
            .SetOnInsert(m => m.PersonaId, personaId);
        if (payload.Summary != null)
            update = update.Set(m => m.Summary, payload.Summary);

        await _memory.UpdateOneAsync(filter, update, new UpdateOptions { IsUpsert = true }, ct);
        return Ok();
    }

    private string? GetUserId() =>
        User.FindFirstValue("oid")
        ?? User.FindFirstValue("http://schemas.microsoft.com/identity/claims/objectidentifier")
        ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
}

public class PersonaMemory
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string UserId { get; set; } = "";
    public int PersonaId { get; set; }
    public List<MemoryEvent> Events { get; set; } = [];
    public string? Summary { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class MemoryEvent
{
    public string Type { get; set; } = "note";
    public int Day { get; set; }
    public string Text { get; set; } = "";
    public DateTime At { get; set; } = DateTime.UtcNow;
}

public class MemoryAppendPayload
{
    public List<MemoryEventDto>? Events { get; set; }
    public string? Summary { get; set; }
}

public class MemoryEventDto
{
    public string? Type { get; set; }
    public int Day { get; set; }
    public string? Text { get; set; }
}
