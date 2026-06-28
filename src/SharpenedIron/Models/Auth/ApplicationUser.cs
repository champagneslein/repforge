using Microsoft.AspNetCore.Identity;

public class ApplicationUser : IdentityUser
{
    public string? TenantId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? ProfilePictureUrl { get; set; }
}
