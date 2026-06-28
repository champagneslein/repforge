# Repforge

Repforge is a React frontend with a .NET backend for a sales training platform.

## Local development

```bash
npm install
npm start
```

```bash
dotnet run --project src/SharpenedIron/SharpenedIron.csproj
```

The backend exposes:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `POST /api/auth/change-password`
- `GET /healthz`

## Backend configuration

Use environment variables in production:

```bash
ConnectionStrings__DefaultConnection="Server=tcp:<server>.database.windows.net,1433;Initial Catalog=repforge;..."
Tokens__JwtKey="<at-least-32-random-characters>"
Tokens__Issuer="RepForge"
Tokens__Audience="RepForge"
Cors__AllowedOrigins__0="https://repforge.example.com"
```

Run the database bootstrap job once to create the ASP.NET Identity schema for the basic login service. Replace this with EF migrations before production customer data is important.

## AKS deployment

Build and push images to Azure Container Registry:

```bash
az acr build --registry <acr-name> --image repforge-frontend:latest --file Dockerfile.frontend .
az acr build --registry <acr-name> --image repforge-backend:latest --file Dockerfile.backend .
```

Update the image registry and host placeholders in `k8s/*.yaml`, then create a real secret from `k8s/secret.example.yaml`:

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/db-bootstrap-job.yaml
kubectl apply -k k8s
```

The ingress routes `/api` to the .NET backend and all other paths to the React frontend.

## Federated login path

Basic email/password auth is now in place using ASP.NET Core Identity and JWTs. For client corporate login later, add a tenant table keyed by customer domain and configure per-tenant OIDC/SAML providers, typically starting with Microsoft Entra ID OIDC for each client. The current `TenantId` claim on `ApplicationUser` is the placeholder for that future tenant boundary.
