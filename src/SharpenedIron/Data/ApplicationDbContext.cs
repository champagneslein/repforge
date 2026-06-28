using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApplicationDb : IdentityDbContext<ApplicationUser>
{
    public ApplicationDb(DbContextOptions<ApplicationDb> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_CS");
    }
}
