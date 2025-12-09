# CCAK - Frontend Scolarité

🖥️ Next.js web interface to access academic services at UCAK:

- Student registration
- Grades
- Academic documents
- Deliberations

## Stack
- Next.js 14 (App Router)
- Tailwind CSS
- i18next (EN, FR, AR)
- TanStack Query (data fetching/caching)
- Zustand (client state)
- Axios + Keycloak (OIDC)
- Docker (optional)

## Getting Started

First, clone the repository and install dependencies:

```bash
git clone https://github.com/Mouride-Professionals/ccak-frontend-scolarite.git
cd ccak-frontend-scolarite
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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

It reads `NEXT_PUBLIC_API_BASE_URL` and lets you extend `getAuthToken()` to add auth headers.

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
