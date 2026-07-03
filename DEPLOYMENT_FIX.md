
# LeCertify Deployment Fix Notes

## Important fixes

### 1. Rotate exposed Neon password
A Neon `DATABASE_URL` was shared in documentation/chat. Treat it as exposed.

In Neon:
1. Go to Project > Roles.
2. Reset the password for `neondb_owner` or create a new role.
3. Copy the new pooled connection string.
4. Update the hosting environment variable `DATABASE_URL`.

### 2. Use existing repo import, not Netlify deploy button
The Netlify button URL previously used:

```text
https://app.netlify.com/integration/start/deploy?repository=...
```

That flow is for extension/template deployment and can create a new GitHub repository with a random suffix. For your existing repo, use:

```text
Netlify Dashboard > Add new project > Import an existing project > GitHub > farookbe/lecertify
```

Recommended Netlify build settings:

```text
Build command: npm run build
Publish directory: .next
Node version: 22
```

### 3. Recommended Vercel deployment
Use:

```text
Vercel Dashboard > New Project > Import Git Repository > farookbe/lecertify
```

Recommended Vercel settings:

```text
Framework: Next.js
Build command: npm run build
Install command: npm install
Root directory: ./
```

### 4. Database setup options

#### Vercel + Neon best option
Use Vercel Storage / Neon Postgres integration. It can create/connect a Neon database and inject `DATABASE_URL` into the Vercel project automatically.

#### Netlify option
Use your Neon database connection string manually or through Neon integrations if available in your Neon dashboard.

### 5. Required hosting environment variables

Minimum:

```text
DATABASE_URL=<your new Neon pooled connection string>
NEXTAUTH_SECRET=<random base64 secret>
CERT_ENCRYPTION_KEY_BASE64=<random 32-byte base64 key>
LECERTIFY_SETUP_MODE=true
SETUP_ADMIN_PASSWORD=<temporary setup password>
```

Generate secrets:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 6. First-run steps

1. Deploy app.
2. Visit `/setup`.
3. In App tab, set your app URL.
4. In Authentication tab, enable Entra ID SSO only when ready.
5. Copy displayed redirect URI into Entra ID App registration.
6. In ACME tab, set email and ACME directory URL.
7. In Azure tab, add Azure DNS service principal values.
8. Set `LECERTIFY_SETUP_MODE=false` and redeploy.

## README deploy section replacement

Use this README section instead of the Netlify deploy button:

```markdown
## Deploy

### Vercel - recommended

Import existing GitHub repository:
https://vercel.com/new

Select:

- Repository: `farookbe/lecertify`
- Framework: `Next.js`
- Build command: `npm run build`

You may use Neon Postgres from Vercel Storage to create/inject `DATABASE_URL` automatically.

### Netlify

Import existing GitHub repository:
https://app.netlify.com/start

Select:

- Repository: `farookbe/lecertify`
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: `22`

Do not use the old Netlify integration/start/deploy button for this existing repo because it creates a new template repository.
```
