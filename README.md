# LeCertify

LeCertify is a SaaS-style ACME / Let's Encrypt certificate management web application.

## One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffarookbe%2Flecertify&project-name=lecertify&repository-name=lecertify)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/integration/start/deploy?repository=https://github.com/farookbe/lecertify)

## What is included

- Next.js web UI
- PostgreSQL database using Prisma
- Setup wizard with form inputs
- Entra ID SSO checkbox + dynamic Entra fields
- Auto-generated Entra ID redirect URI display
- Azure DNS DNS-01 automation
- `_acme-challenge` CNAME delegation
- ACME issuance using `acme-client`
- Encrypted secret/certificate storage
- Vercel and Netlify deployment files

## Minimum environment variables

These three values must be environment variables because the app needs them before the setup form/database settings can work:

```text
DATABASE_URL
NEXTAUTH_SECRET
CERT_ENCRYPTION_KEY_BASE64
```

Generate secrets:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Use the output once for `NEXTAUTH_SECRET` and generate a second value for `CERT_ENCRYPTION_KEY_BASE64`.

## Where to get DATABASE_URL

### Neon free PostgreSQL

Go to Neon Console > your project > **Connect** > copy the pooled PostgreSQL connection string. It usually contains `-pooler` in the hostname.

### Supabase free PostgreSQL

Go to Supabase Project > **Connect** or Database settings > copy the transaction/session pooler PostgreSQL connection string for serverless hosting.

## First deploy flow

1. Delete old files from GitHub.
2. Upload this clean copy.
3. Set minimum environment variables in Vercel/Netlify:

```text
DATABASE_URL
NEXTAUTH_SECRET
CERT_ENCRYPTION_KEY_BASE64
LECERTIFY_SETUP_MODE=true
SETUP_ADMIN_PASSWORD=<temporary-password>
```

4. Deploy.
5. Browse to `/setup`.
6. Complete all tabs including Authentication.
7. If Entra ID SSO is enabled, copy the redirect URI shown in the UI and add it to your Entra ID App Registration as a Web redirect URI.
8. Disable setup mode after configuration:

```text
LECERTIFY_SETUP_MODE=false
```

## Entra ID redirect URI

The setup page will show this dynamically:

```text
https://your-domain/api/auth/callback/azure-ad
```

For local development:

```text
http://localhost:3000/api/auth/callback/azure-ad
```

## Local development

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:push
npm run dev
```

Open:

```text
http://localhost:3000/setup
```
