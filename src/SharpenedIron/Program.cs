using Microsoft.AspNetCore.Authentication.JwtBearer;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddHealthChecks();

var mongoConnectionString = builder.Configuration.GetConnectionString("MongoDB")
    ?? throw new InvalidOperationException("ConnectionStrings__MongoDB must be configured.");

builder.Services.AddSingleton<IMongoDatabase>(_ =>
{
    var client = new MongoClient(mongoConnectionString);
    return client.GetDatabase("repforge");
});

var entraAuthority = builder.Configuration["Entra:Authority"]
    ?? throw new InvalidOperationException("Entra__Authority must be configured (https://<tenant>.ciamlogin.com/<tenantId>/v2.0).");
var entraClientId = builder.Configuration["Entra:ClientId"]
    ?? throw new InvalidOperationException("Entra__ClientId must be configured.");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = entraAuthority;
        options.TokenValidationParameters.ValidAudiences = [entraClientId, $"api://{entraClientId}"];
        options.TokenValidationParameters.NameClaimType = "name";
    });

builder.Services.AddAuthorization();
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        var origins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];
        policy.WithOrigins(origins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseCors("Frontend");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHealthChecks("/healthz");

app.Run();
