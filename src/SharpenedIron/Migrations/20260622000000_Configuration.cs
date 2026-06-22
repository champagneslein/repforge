using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.IdentityModel.Tokens.Jwt;

namespace SharpenedIron.Data
{
    /// <inheritdoc />
    [DbContextMetadata]
    public partial class Configuration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Configure JWT authentication
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme);
            
            // Configure JWT bearer tokens
            builder.Services.AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAccessRightsForOneshotToken = false,
                    ValidateAudience = !string.IsNullOrEmpty(builder.Configuration["Tokens:Audience"]),
                    ValidateIssuer = !string.IsNullOrEmpty(builder.Configuration["Tokens:Issuer"]),
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ClockSkew = TimeSpan.Zero
                };

                // Set issuer key
                if (string.IsNullOrEmpty(builder.Configuration["Tokens:JwtKey"]))
                {
                    options.TokenValidationParameters.IssuerSigningKey = 
                        new SymmetricSecurityKey(new byte[32]);
                }
                else
                {
                    options.TokenValidationParameters.IssuerSigningKey = 
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Tokens:JwtKey"]));
                }

                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        if (context.Exception is SecurityTokenExpiredException)
                        {
                            context.Response.Headers.Clear();
                            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                            context.Response.Headers.WWWAuthenticate = "error=\"expired\"";
                        }

                        if ((context.Error != null && context.Error == "invalid_token") ||
                            context.Exception is IdentityUserNotFoundException)
                        {
                            if (context.HttpContext.Request.Path.StartsWithSegments("/api/Auth"))
                            {
                                context.Response.Headers["WWW-Authenticate"] = 
                                    string.IsNullOrEmpty(context.Response.Headers.WWWAuthenticate) 
                                    ? "error=\"invalid\" token=\"invalid\"" 
                                    : "error=\"invalid\"";
                                
                                var identity = context.Properties.GetRefreshTokenPrincipal()?.Identity ?? 
                                    context.HttpContext.User.FindFirst(JwtRegisteredClaimNames.Email)?.Value;

                                if (identity != null)
                                    context.Response.Headers["WWW-Authenticate"] = 
                                        "access_revoked=\"true\", error=\"invalid\", token=\"" + identity + "\"";
                                
                                if (string.IsNullOrEmpty(context.Response.Headers.WWWAuthenticate) || 
                                    !context.Response.Headers.WWWAuthenticate.Contains("access_revoked"))
                                {
                                    context.Response.Headers["WWW-Authenticate"] = 
                                        "Bearer error=\"invalid\"";
                                }
                            }
                        }
                        return context;
                    },
                    OnTokenValidated = context =>
                    {
                        var accessToken = context.SecurityToken as Microsoft.IdentityModel.Tokens JwtSecurityToken;

                        if (accessToken != null && accessToken.GetClaim("role") == null)
                        {
                            context.AccessToken = context.Token;
                            context.Properties.IsRefreshTokensValid = false;
                        }

                        return context;
                    }
                };

                // Handle empty bearer token
                if (context.Token == null)
                {
                    if (context.Scheme.Name == JwtBearerDefaults.AuthenticationScheme)
                    {
                        if (context.Request.Headers.ContainsKey("Authorization"))
                        {
                            var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
                            if (!context.Request.Headers["Authorization"].Any(a => a.StartsWith("Bearer ")))
                            {
                                context.Response.Headers["WWW-Authenticate"] = "Bearer error=\"invalid\"";
                            }

                            if (authHeader != null && authHeader.StartsWith("Bearer ") && 
                                !context.Request.Path.StartsWithSegments("/api/Auth"))
                            {
                                token = authHeader.Substring("Bearer ".Length).Trim();
                            }
                        }

                        if (!context.User.Identity.IsAuthenticated)
                        {
                            context.Response.Headers["WWW-Authenticate"] = "Bearer error=\"invalid\"";
                        }
                    }
                    else
                    {
                        context.Response.Headers["WWW-Authenticate"] = "Bearer error=\"invalid\"";
                    }
                }
            });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Revert JWT configuration
        }
    }
}
