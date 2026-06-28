using Microsoft.AspNetCore.Identity;
using MongoDB.Driver;

public class MongoUserStore :
    IUserStore<ApplicationUser>,
    IUserPasswordStore<ApplicationUser>,
    IUserEmailStore<ApplicationUser>,
    IUserLockoutStore<ApplicationUser>,
    IUserSecurityStampStore<ApplicationUser>
{
    private readonly IMongoCollection<ApplicationUser> _users;

    public MongoUserStore(IMongoDatabase db)
    {
        _users = db.GetCollection<ApplicationUser>("users");
        var indexKeys = Builders<ApplicationUser>.IndexKeys.Ascending(u => u.NormalizedEmail);
        _users.Indexes.CreateOne(new CreateIndexModel<ApplicationUser>(
            indexKeys, new CreateIndexOptions { Unique = true, Sparse = true }));
    }

    public async Task<IdentityResult> CreateAsync(ApplicationUser user, CancellationToken ct)
    {
        await _users.InsertOneAsync(user, cancellationToken: ct);
        return IdentityResult.Success;
    }

    public async Task<IdentityResult> UpdateAsync(ApplicationUser user, CancellationToken ct)
    {
        await _users.ReplaceOneAsync(u => u.Id == user.Id, user, cancellationToken: ct);
        return IdentityResult.Success;
    }

    public async Task<IdentityResult> DeleteAsync(ApplicationUser user, CancellationToken ct)
    {
        await _users.DeleteOneAsync(u => u.Id == user.Id, ct);
        return IdentityResult.Success;
    }

    public Task<ApplicationUser?> FindByIdAsync(string userId, CancellationToken ct)
        => _users.Find(u => u.Id == userId).FirstOrDefaultAsync(ct)!;

    public Task<ApplicationUser?> FindByNameAsync(string normalizedUserName, CancellationToken ct)
        => _users.Find(u => u.NormalizedUserName == normalizedUserName).FirstOrDefaultAsync(ct)!;

    public Task<string?> GetUserIdAsync(ApplicationUser user, CancellationToken ct)
        => Task.FromResult<string?>(user.Id);

    public Task<string?> GetUserNameAsync(ApplicationUser user, CancellationToken ct)
        => Task.FromResult(user.UserName);

    public Task SetUserNameAsync(ApplicationUser user, string? userName, CancellationToken ct)
    {
        user.UserName = userName;
        return Task.CompletedTask;
    }

    public Task<string?> GetNormalizedUserNameAsync(ApplicationUser user, CancellationToken ct)
        => Task.FromResult(user.NormalizedUserName);

    public Task SetNormalizedUserNameAsync(ApplicationUser user, string? normalizedName, CancellationToken ct)
    {
        user.NormalizedUserName = normalizedName;
        return Task.CompletedTask;
    }

    // IUserPasswordStore
    public Task SetPasswordHashAsync(ApplicationUser user, string? passwordHash, CancellationToken ct)
    {
        user.PasswordHash = passwordHash;
        return Task.CompletedTask;
    }

    public Task<string?> GetPasswordHashAsync(ApplicationUser user, CancellationToken ct)
        => Task.FromResult(user.PasswordHash);

    public Task<bool> HasPasswordAsync(ApplicationUser user, CancellationToken ct)
        => Task.FromResult(user.PasswordHash != null);

    // IUserEmailStore
    public Task SetEmailAsync(ApplicationUser user, string? email, CancellationToken ct)
    {
        user.Email = email;
        return Task.CompletedTask;
    }

    public Task<string?> GetEmailAsync(ApplicationUser user, CancellationToken ct)
        => Task.FromResult(user.Email);

    public Task<bool> GetEmailConfirmedAsync(ApplicationUser user, CancellationToken ct)
        => Task.FromResult(user.EmailConfirmed);

    public Task SetEmailConfirmedAsync(ApplicationUser user, bool confirmed, CancellationToken ct)
    {
        user.EmailConfirmed = confirmed;
        return Task.CompletedTask;
    }

    public Task<ApplicationUser?> FindByEmailAsync(string normalizedEmail, CancellationToken ct)
        => _users.Find(u => u.NormalizedEmail == normalizedEmail).FirstOrDefaultAsync(ct)!;

    public Task<string?> GetNormalizedEmailAsync(ApplicationUser user, CancellationToken ct)
        => Task.FromResult(user.NormalizedEmail);

    public Task SetNormalizedEmailAsync(ApplicationUser user, string? normalizedEmail, CancellationToken ct)
    {
        user.NormalizedEmail = normalizedEmail;
        return Task.CompletedTask;
    }

    // IUserLockoutStore
    public Task<DateTimeOffset?> GetLockoutEndDateAsync(ApplicationUser user, CancellationToken ct)
        => Task.FromResult(user.LockoutEnd);

    public Task SetLockoutEndDateAsync(ApplicationUser user, DateTimeOffset? lockoutEnd, CancellationToken ct)
    {
        user.LockoutEnd = lockoutEnd;
        return Task.CompletedTask;
    }

    public Task<int> IncrementAccessFailedCountAsync(ApplicationUser user, CancellationToken ct)
    {
        user.AccessFailedCount++;
        return Task.FromResult(user.AccessFailedCount);
    }

    public Task ResetAccessFailedCountAsync(ApplicationUser user, CancellationToken ct)
    {
        user.AccessFailedCount = 0;
        return Task.CompletedTask;
    }

    public Task<int> GetAccessFailedCountAsync(ApplicationUser user, CancellationToken ct)
        => Task.FromResult(user.AccessFailedCount);

    public Task<bool> GetLockoutEnabledAsync(ApplicationUser user, CancellationToken ct)
        => Task.FromResult(user.LockoutEnabled);

    public Task SetLockoutEnabledAsync(ApplicationUser user, bool enabled, CancellationToken ct)
    {
        user.LockoutEnabled = enabled;
        return Task.CompletedTask;
    }

    // IUserSecurityStampStore
    public Task SetSecurityStampAsync(ApplicationUser user, string stamp, CancellationToken ct)
    {
        user.SecurityStamp = stamp;
        return Task.CompletedTask;
    }

    public Task<string?> GetSecurityStampAsync(ApplicationUser user, CancellationToken ct)
        => Task.FromResult(user.SecurityStamp);

    public void Dispose() { }
}
