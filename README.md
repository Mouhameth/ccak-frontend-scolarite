# CCAK - Frontend Scolarité

🖥️ Next.js web interface to access academic services at UCAK:

- Student registration
- Grades
- Academic documents
- Deliberations

## Stack
- Next.js 16 (App Router)
- Tailwind CSS
- TanStack Query (data fetching/caching)
- Zustand (client state)
- NextAuth + Keycloak (OIDC)
- Docker (optional)

## Getting Started

First, clone the repository and install dependencies:

```bash
git clone https://github.com/Mouride-Professionals/ccak-frontend-scolarite.git
cd ccak-frontend-scolarite
pnpm install
```

Copy the local environment file, then run the development server:

```bash
cp .env.local.example .env.local
```

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.
If you are running the Docker app service, use [http://localhost:3000](http://localhost:3000) instead.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Code Quality

- Lint: `pnpm lint`
- Prettier format: `pnpm format`
- Prettier check (CI): `pnpm format:check`
- Data fetching/state: TanStack Query is pre-wired via `app/providers.tsx` (with devtools in development), and Zustand is available for client state stores.
- Pre-commit: Husky + lint-staged run lint/format on staged files. Install hooks with `pnpm install` (runs `pnpm prepare` automatically).

## HTTP client

Use `lib/api-client.ts` as a thin `fetch` wrapper with base URL, JSON handling, and shared headers:

```ts
import { api } from "@/lib/api-client";

const data = await api.get("/students");
```

It reads `NEXT_PUBLIC_API_BASE_URL` and attaches the NextAuth access token when available (see `getAuthToken()`).

## Authentication (Keycloak)

- NextAuth is configured in `app/api/auth/[...nextauth]/route.ts` with a Keycloak provider.
- SessionProvider is wired in `app/providers.tsx`; use `useSession` or the `useAuth` helper from `lib/auth-client.ts`.
- Login route: `/login` (redirects to Keycloak and returns to the original URL).
- Password reset: `/forgot-password` (links to Keycloak reset page).
- Protected routes: `proxy.ts` guards `/dashboard` and `/admin` (adjust the matcher as needed).
- Email templates for password reset are configured in Keycloak (realm → Email → Templates).

Required environment variables:

```
NEXTAUTH_URL
NEXTAUTH_SECRET
KEYCLOAK_BASE_URL
KEYCLOAK_REALM
KEYCLOAK_CLIENT_ID
KEYCLOAK_CLIENT_SECRET
```

Optional for client-side Keycloak logout:

```
NEXT_PUBLIC_KEYCLOAK_BASE_URL
NEXT_PUBLIC_KEYCLOAK_REALM
```

Set `NEXTAUTH_URL` to the URL where the app is reachable (e.g., `http://localhost:5173` for local dev).

Each developer should generate their own `NEXTAUTH_SECRET` locally (do not commit it). For shared environments
(staging/production), use a single stable secret set in the hosting environment variables.

Generate a secret locally with:

```bash
openssl rand -base64 32
```

Note: if your Keycloak client is public (PKCE), leave `KEYCLOAK_CLIENT_SECRET` empty. Also update
`NEXT_PUBLIC_API_BASE_URL` if you use a local API.

## Docker

Build the production image:

```bash
docker build -t ccak-frontend .
```

Run the container (exposes port 3000 by default):

```bash
docker run -p 3000:3000 --env-file .env.local ccak-frontend
```

Replace `.env.local` with the environment file that contains your runtime variables (e.g., OIDC configuration).

### Docker Compose

Build and run with Compose (will rebuild if needed):

```bash
docker compose up --build
```

Run detached:

```bash
docker compose up -d --build
```

Compose reads environment variables from `.env.local` by default as configured in `docker-compose.yml`.

For a development container with hot reload, use the `dev` service (bind mounts your code and caches dependencies in volumes):

```bash
docker compose up dev
```

The dev server is exposed on port 5173.

For a production-like container using the Dockerfile build:

```bash
docker compose up --build app
```

Copy the provided example env file before running:

```bash
cp .env.docker.example .env.local
```

## CI/CD

GitHub Actions pipeline (`.github/workflows/ci-cd.yml`) runs on every push:

- `test`: installs dependencies and runs `pnpm test` (lint + Prettier check).
- `build`: runs `pnpm build`.
- `deploy-staging`: builds and pushes a staging Docker image to GHCR (`ghcr.io/<owner>/<repo>:staging`). Requires repository package permissions (uses `GITHUB_TOKEN` by default).
