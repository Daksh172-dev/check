# eCommerce Monorepo Boilerplate

[![Frontend CI](https://github.com/Daksh172-dev/check/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/Daksh172-dev/check/actions/workflows/frontend-ci.yml)
[![Backend CI](https://github.com/Daksh172-dev/check/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/Daksh172-dev/check/actions/workflows/backend-ci.yml)
[![Prisma Migrations](https://github.com/Daksh172-dev/check/actions/workflows/prisma-migrate.yml/badge.svg)](https://github.com/Daksh172-dev/check/actions/workflows/prisma-migrate.yml)
[![Deploy Web (Vercel)](https://github.com/Daksh172-dev/check/actions/workflows/deploy-web-vercel.yml/badge.svg)](https://github.com/Daksh172-dev/check/actions/workflows/deploy-web-vercel.yml)
[![Deploy API (Render/Railway)](https://github.com/Daksh172-dev/check/actions/workflows/deploy-api.yml/badge.svg)](https://github.com/Daksh172-dev/check/actions/workflows/deploy-api.yml)

A minimal full-stack eCommerce starter using:

- **Next.js 14** (App Router + TypeScript)
- **Express API** (TypeScript)
- **Prisma** with PostgreSQL
- **Monorepo layout** (`apps/web`, `apps/api`, `packages/ui`, `packages/types`)
- **Docker** (dev + production)
- **GitHub Actions** (CI/CD workflows)

## Quick start

```bash
npm install
npm run dev
```

Web app: `http://localhost:3000`
API: `http://localhost:4000`

## Environment

Copy `.env.example` to `.env` and update values.

## GitHub Actions secrets

Set the following repository secrets for CI/CD workflows:

- `DATABASE_URL` (for Prisma migration workflow)
- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` (for Vercel deploy workflow)
- `RENDER_DEPLOY_HOOK_URL` (optional, for Render deploy hook job)
- `RAILWAY_DEPLOY_HOOK_URL` (optional, for Railway deploy hook job)
