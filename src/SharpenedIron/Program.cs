var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

// ==================== AUTHENTICATION ====================

// Add Identity services
builder.Services.AddIdentity<ApplicationUser, IdentityUser>()
    .AddDefaultUI()
    .AddEntityFrameworkStores<YourDbContext>();

// Add JWT authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            builder.Configuration["Tokens:JwtKey"] ?? "fallback-key-here")),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidIssuer = builder.Configuration["Tokens:Issuer"] ?? "RepForge",
        ValidAudience = builder.Configuration["Tokens:Audience"] ?? "RepForge",
        ClockSkew = TimeSpan.Zero
    };
});

// Add authorization policies
builder.Services.AddAuthorizationBuilder();

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthorization();

app.MapRazorPages();
app.MapControllers();

app.Run();
