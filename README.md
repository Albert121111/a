# Tiara Fitness Club

## Requirements
- Node.js **>= 18.17.0** (recommended: 20 LTS)
- npm **>= 9**
- Docker + Docker Compose

If you are on Node 16 and see `For Next.js, Node.js version >= v18.17.0 is required`, switch Node first:
- `nvm use` (uses `.nvmrc` in repo), or
- install Node 20 LTS manually.

## Run
1. `npm i`
2. `cp .env.example .env`
3. `docker compose up -d`
4. `npm run prisma:generate`
5. `npm run prisma:migrate`
6. `npm run prisma:seed`
7. `npm run dev`

## Env
- NextAuth: `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, optional Google OAuth vars.
- Stripe: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` (test mode works).
- Email: `EMAIL_FROM` (empty => mock email logs).
- Analytics: `NEXT_PUBLIC_ANALYTICS_PROVIDER` (`console` fallback).

## Content editing
- UI strings/pages: `app/[locale]/**/*` and `messages/*.json`.
- CMS-like content: Prisma models + `prisma/seed.ts` (`ru/en` fields in DB).
- Images: `public/images/*`.

## Demo credentials
- admin@tiara.fit / password123
- member@tiara.fit / password123
