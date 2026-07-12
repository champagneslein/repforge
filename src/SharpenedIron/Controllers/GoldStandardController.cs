using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class GoldStandardController : ControllerBase
{
    // One gold-standard product profile per tenant; single-tenant for now.
    private const string TenantId = "repforge";

    private readonly IMongoCollection<GoldStandard> _gold;

    public GoldStandardController(IMongoDatabase db)
    {
        _gold = db.GetCollection<GoldStandard>("goldstandard");
        _gold.Indexes.CreateOne(new CreateIndexModel<GoldStandard>(
            Builders<GoldStandard>.IndexKeys.Ascending(g => g.TenantId),
            new CreateIndexOptions { Unique = true }));
    }

    [HttpGet]
    public async Task<IActionResult> Get(CancellationToken ct)
    {
        var doc = await _gold.Find(g => g.TenantId == TenantId).FirstOrDefaultAsync(ct);
        return Ok(new { data = doc?.Data });
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromBody] GoldStandardPayload payload, CancellationToken ct)
    {
        var filter = Builders<GoldStandard>.Filter.Eq(g => g.TenantId, TenantId);
        var update = Builders<GoldStandard>.Update
            .Set(g => g.Data, payload.Data)
            .Set(g => g.UpdatedAt, DateTime.UtcNow)
            .SetOnInsert(g => g.TenantId, TenantId);

        await _gold.UpdateOneAsync(filter, update, new UpdateOptions { IsUpsert = true }, ct);
        return Ok();
    }
}

public class GoldStandard
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string TenantId { get; set; } = "";
    public object? Data { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class GoldStandardPayload
{
    public object? Data { get; set; }
}
