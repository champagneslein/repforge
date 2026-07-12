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
        var json = doc?.Data?.ToJson(new JsonWriterSettings { OutputMode = JsonOutputMode.RelaxedExtendedJson }) ?? "null";
        return Content("{\"data\":" + json + "}", "application/json");
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromBody] GoldStandardPayload payload, CancellationToken ct)
    {
        // System.Text.Json binds `data` as JsonElement, which the Mongo driver
        // cannot serialize — round-trip through raw JSON into a BsonDocument.
        var bson = payload.Data is { ValueKind: JsonValueKind.Object } el
            ? BsonDocument.Parse(el.GetRawText())
            : null;
        if (bson == null) return BadRequest(new { error = "data must be a JSON object" });

        var filter = Builders<GoldStandard>.Filter.Eq(g => g.TenantId, TenantId);
        var update = Builders<GoldStandard>.Update
            .Set(g => g.Data, bson)
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
    public BsonDocument? Data { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class GoldStandardPayload
{
    public JsonElement Data { get; set; }
}
