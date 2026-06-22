using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace SharpenedIron.Data;

public class ApplicationDb : IdentityDbContext<ApplicationUser>
{
    public ApplicationDb(DbContextOptions<ApplicationDb> options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer(/* Your connection string */);

    protected override void OnModelCreating(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnModelCreating(optionsBuilder);

        optionsBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_CS");
    }
}
