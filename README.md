# RepForge

AI sales training platform — a React frontend and a .NET 10 backend. Sign-in is handled by Microsoft Entra External ID, data lives in MongoDB (Azure Cosmos DB in production), and voice calls run on ElevenLabs Conversational AI.

## Running locally

Prerequisites (one-time):

```bash
# MongoDB (backend data store)
brew tap mongodb/brew && brew trust mongodb/brew && brew install mongodb-community

# Frontend deps
npm install
```

The backend reads `src/SharpenedIron/appsettings.Development.json` (gitignored — it holds the local Mongo connection string and the ElevenLabs API key). If you're setting up a fresh clone, create it:

```json
{
  "ConnectionStrings": { "MongoDB": "mongodb://localhost:27017" },
  "ElevenLabs": { "ApiKey": "<your ElevenLabs API key>" },
  "Cors": { "AllowedOrigins": ["http://localhost:3000"] }
}
```

Then run three things (each in its own terminal, or `brew services` keeps Mongo running in the background):

```bash
# 1. MongoDB — starts it now and on every login
brew services start mongodb-community

# 2. Backend on port 5050
ASPNETCORE_ENVIRONMENT=Development ASPNETCORE_URLS=http://localhost:5050 \
  dotnet run --project src/SharpenedIron/SharpenedIron.csproj --no-launch-profile

# 3. Frontend on port 3000 (proxies /api/* to the backend via the "proxy" field in package.json)
npm start
```

Open http://localhost:3000. Sign-in redirects to the Entra External ID hosted page (`http://localhost:3000` is a registered redirect URI). Microphone access works on localhost without HTTPS, so voice calls are fully testable.

Quick health checks:

- `curl http://localhost:5050/healthz` → `Healthy`
- `curl -i http://localhost:5050/api/progress` → `401` (endpoints require an Entra token)

## Authentication

Users authenticate against the Entra External ID tenant `repforgecustomers.onmicrosoft.com` (sign-up/sign-in user flow, email + password). The SPA acquires tokens via MSAL (`src/authConfig.js`); the backend validates them as JWT bearer tokens and identifies users by the `oid` claim. There are no local passwords or auth endpoints.

Backend configuration (already in `appsettings.json` / k8s configmap):

```
Entra__Authority=https://repforgecustomers.ciamlogin.com/<tenant-id>/v2.0
Entra__ClientId=<app client id>
ConnectionStrings__MongoDB=<mongo connection string>
ElevenLabs__ApiKey=<api key>            # secret
Cors__AllowedOrigins__0=<frontend origin>
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`: it builds both Docker images, pushes them to ACR (`ironforge.azurecr.io`), and applies `k8s/` to the AKS cluster (`Ironforge-Test`, namespace `repforge`).

Note: the kustomization includes the ingress, so deploys re-create it even if it was deleted manually. TLS uses a self-signed cert (secret `repforge-tls`) — required because browsers only allow microphone access over HTTPS.

## Voice calls

The frontend uses `@elevenlabs/react` with agent overrides (per-persona system prompt, voice, and first message). The agent requires authentication: the backend's `GET /api/calltoken` exchanges the ElevenLabs API key for a short-lived conversation token, keeping the key server-side. The agent must have "allow overrides" enabled for prompt/voice/first message in the ElevenLabs dashboard.
