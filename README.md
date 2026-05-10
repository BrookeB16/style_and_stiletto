# Style & Stiletto — Setup Guide

Your site has these files to deploy:

```
index.html               ← the intake form (your existing design, now wired up)
responses-dashboard.html ← private admin page to view all submissions
api/submit.js            ← receives form data and saves to Supabase
api/responses.js         ← fetches all responses for your dashboard
vercel.json              ← tells Vercel how to route everything
package.json             ← project dependencies
supabase-schema.sql      ← run once in Supabase to create the database table
```

---

## Step 1 — Create a Supabase project (free)

1. Go to supabase.com and sign up
2. Click **New project**, give it a name (e.g. `style-and-stiletto`), set a password
3. Once created, go to **SQL Editor** in the left sidebar
4. Paste the contents of `supabase-schema.sql` and click **Run**
5. Go to **Project Settings → API** and copy:
   - **Project URL** → you'll need this as `SUPABASE_URL`
   - **service_role** secret key → you'll need this as `SUPABASE_SERVICE_KEY`

---

## Step 2 — Deploy to Vercel (free)

**Option A: Via GitHub (recommended)**
1. Create a free account at github.com
2. Create a new repository (e.g. `style-and-stiletto`)
3. Upload all the files — keeping the `api/` folder structure intact
4. Go to vercel.com and sign up with GitHub
5. Click **Add New Project** → import your GitHub repo
6. Click **Deploy**

**Option B: Via Vercel CLI**
```bash
npm install -g vercel
cd your-project-folder
vercel
```

---

## Step 3 — Add environment variables in Vercel

Go to your Vercel project → **Settings → Environment Variables** and add:

| Variable               | Value                          |
|------------------------|--------------------------------|
| `SUPABASE_URL`         | Your Supabase project URL      |
| `SUPABASE_SERVICE_KEY` | Your Supabase service_role key |
| `ADMIN_TOKEN`          | Make up any secret password    |

Then go to **Deployments → Redeploy** so the variables take effect.

---

## Step 4 — Connect your GoDaddy domain

You have two options. **Option A (nameservers) is simpler** and recommended unless you have email or other services already running on this domain.

### Option A: Point nameservers to Vercel

**In Vercel:**
1. Go to your project → **Settings → Domains**
2. Click **Add Domain** and enter your domain (e.g. `styleandstiletto.com`)
3. Vercel will show you two nameserver addresses — keep this tab open:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`

**In GoDaddy:**
1. Log in → click your profile icon → **My Products**
2. Find your domain and click **DNS**
3. Scroll to the bottom → click **Change** next to Nameservers
4. Select **Enter my own nameservers**
5. Replace the existing nameservers with the two Vercel ones above
6. Save — GoDaddy will send a confirmation email; approve it

DNS changes take anywhere from 10 minutes to a few hours. Once done, Vercel will show **Valid Configuration** next to your domain.

---

### Option B: Add a DNS record (keeps GoDaddy as nameserver)

Use this if you have GoDaddy email or other services on this domain you don't want to disrupt.

**In Vercel:**
1. Go to your project → **Settings → Domains**
2. Click **Add Domain** → enter your domain
3. Vercel will display a DNS record to add — either:
   - An **A record** pointing to `76.76.21.21` (for apex domains like `styleandstiletto.com`)
   - A **CNAME record** pointing to `cname.vercel-dns.com` (for `www.styleandstiletto.com`)

**In GoDaddy:**
1. Log in → **My Products** → click **DNS** next to your domain
2. In the DNS Records table, click **Add New Record**
3. Add the record type (A or CNAME) with the values Vercel gave you
4. If Vercel asks you to remove an existing A record, delete the old one first
5. Save and wait for DNS to propagate

---

## Step 5 — Test it

- **Intake form:** `https://yourdomain.com/`
- **Admin dashboard:** `https://yourdomain.com/responses-dashboard.html`
  - Enter your `ADMIN_TOKEN` to view all client submissions

---

## Tips

- **Keep your ADMIN_TOKEN private** — don't share the dashboard URL publicly
- Vercel automatically provisions an SSL certificate (https) for your domain — no setup needed
- In Supabase, you can also view and export responses under **Table Editor → style_profiles**
- If you use GoDaddy email on this domain, use Option B to avoid disrupting it
