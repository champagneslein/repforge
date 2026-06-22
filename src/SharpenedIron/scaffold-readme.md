# Authentication Setup Guide

## Getting Started

### 1. Restore NuGet Packages

```bash
dotnet restore
```

### 2. Add Data Layer

Create an interface for your data layer:

```csharp
// Models/Data/IRepository.cs
public interface IRepository<T> where T : class
{
    Task<T> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task AddAsync(T item);
    Task<bool> UpdateAsync(T item);
    Task<bool> DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
}
```

### 3. Create the Database

```bash
dotnet ef database update
```

### 4. Configure AppSettings

Edit `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Your_database_connection_string"
  },
  "Tokens": {
    "JwtKey": "SuperSecret1234567890123456789012345",
    "Issuer": "RepForge",
    "Audience": "RepForge"
  }
}
```

### 5. Update Program.cs

Replace the Program.cs with authentication configuration:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add Identity services
builder.Services.AddIdentity<ApplicationUser, IdentityUser>()
    .AddDefaultUI()
    .AddEntityFrameworkStores<ApplicationDb>();

builder.Services.AddAuthentication();
builder.Services.AddAuthorization();
builder.Services.AddControllers();

var app = builder.Build();
```

## Authentication Endpoints

### Register (/api/Auth/register)

Register a new user account:

```bash
curl -X POST http://localhost:5000/api/Auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### Login (/api/Auth/login)

Login with existing account:

```bash
curl -X POST http://localhost:5000/api/Auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!"
  }'
```

### Logout (/api/Auth/logout)

Logout the current user:

```bash
curl -X POST http://localhost:5000/api/Auth/logout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Refresh Token (/api/Auth/refresh-token)

Refresh expired access token:

```bash
curl -X POST http://localhost:5000/api/Auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
```

### Get Profile (/api/Auth/profile)

Get current user profile:

```bash
curl -X GET http://localhost:5000/api/Auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Change Password (/api/Auth/change-password)

Change current user's password:

```bash
curl -X POST http://localhost:5000/api/Auth/change-password \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "oldPassword": "OldPassword123!",
    "newPassword": "NewPassword456!"
  }'
```

## Token Format

The authentication system returns JWT tokens with the following structure:

```json
{
  "AccessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "RefreshToken": "abc123def456",
  "ExpiresAt": "2024-01-01T00:00:00Z"
}
```

## JWT Structure

Access tokens include:
- `sub`: User ID
- `email`: User email
- `firstName`: User first name
- `lastName`: User last name
- `exp`: Expiration time

## Security Notes

1. Store JWT keys securely in `appsettings.json`
2. Enable HTTPS in production
3. Set minimum password requirements
4. Implement token expiration
5. Store refresh tokens in a database

## Next Steps

1. Complete the data layer (IRepository implementations)
2. Add domain logic and services
3. Create controllers for your domain
4. Implement authentication policies and authorization
5. Add refresh token middleware
6. Configure CORS for frontend API calls

## Files Created

```
SharpenedIron/
├── Program.cs                    # Authentication configuration
├── appsettings.json             # Connection strings and JWT config
├── Models/
│   └── Auth/
│       ├── ApplicationUser.cs       # Identity user extension
│       ├── Token.cs                 # Token model
│       ├── RefreshTokenRequest.cs   # Refresh token request
│       └── ChangePasswordRequest.cs # Change password request
├── Controllers/
│   └── Auth/
│       └── AuthController.cs        # Authentication endpoints
└── Services/
    └── Auth/
        ├── IAuthService.cs          # Auth service interface
        ├── AuthService.cs           # Auth service implementation
        └── TokenService.cs          # JWT token management
```
