# RepForge

AI sales training platform: a React frontend with serverless API functions on Vercel. Sign-in and data are on Supabase, and voice calls run on ElevenLabs Conversational AI.

## Hosting: Vercel + Supabase

- **Vercel** builds the React app and runs the backend as serverless functions in `api/`.
- **Supabase** handles sign-in (email + password) and stores data (`progress`, `gold_standard`, `persona_memory`).
- The old .NET backend (`src/SharpenedIron`), Dockerfiles and `k8s/` are from the previous Azure setup and are no longer used. The Azure GitHub Action only runs if triggered by hand.

### One-time setup

1. **Supabase:** create a project. In SQL Editor, run `supabase/schema.sql`. Under Authentication > URL Configuration, set the Site URL to your Vercel URL.
2. **Vercel:** import this GitHub repo as a new project and add the environment variables from `.env.example` (Supabase keys are under Project Settings > API in Supabase).
3. **Voice calls:** in ElevenLabs, create a Conversational AI agent with "allow overrides" enabled for prompt, voice and first message, then set `ELEVENLABS_API_KEY` and `ELEVENLABS_AGENT_ID`.

### Running locally

```bash
npm install
cp .env.example .env.local   # fill in the values
npx vercel dev               # runs the app and the api/ functions together
```

## Accounts and people

The sales world lives in `src/world`: 88 fictional accounts across 8 industries (4 SMB, 4 Mid-Market, 3 Enterprise each; enterprise accounts have 30+ people). The original 20 are hand-written in `legacy.js`; the rest come from `scripts/generate-world.mjs` (`node scripts/generate-world.mjs` regenerates `generated.js`).

## Voice calls

The frontend uses `@elevenlabs/react` with agent overrides (per-persona system prompt, voice, and first message). The agent requires authentication: `GET /api/calltoken` (`api/calltoken.js`) exchanges the ElevenLabs API key for a short-lived conversation token, keeping the key server-side. The agent must have "allow overrides" enabled for prompt/voice/first message in the ElevenLabs dashboard.
