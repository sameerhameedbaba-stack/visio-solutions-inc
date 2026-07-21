# Go live: Vercel + Hostinger domain — steps & Claude Chrome prompt

The cleanest "connect GitHub → live" path for this Next.js app. Vercel builds the
repo automatically and hosts it; Hostinger keeps the domain and just points DNS at
Vercel. The **contact form keeps working** (server `/api/contact`), and every push
to GitHub auto-deploys.

> I can't do this for you directly — I have no access to your Vercel, GitHub, or
> Hostinger accounts. You (or the Claude for Chrome extension you run) click
> through it. Everything else is already done: the app is on GitHub (public repo
> `sameerhameedbaba-stack/visio-solutions-inc`) and builds cleanly.

## Part A — Deploy on Vercel (2–3 min)

1. Go to <https://vercel.com> and **Log in with GitHub** (the account that owns the repo).
2. **Add New… → Project**.
3. Under **Import Git Repository**, find `sameerhameedbaba-stack/visio-solutions-inc` → **Import**.
   (If it's not listed, click **Adjust GitHub App Permissions / Configure**, grant
   Vercel access to the repo, then Import.)
4. Vercel auto-detects **Next.js** — leave the default build settings. **Do not** add a
   `STATIC_EXPORT` variable. You can skip Environment Variables for now.
5. **Deploy**. When it finishes, open the `*.vercel.app` URL and confirm the homepage
   loads. Vercel builds your default branch (`claude/website-creation-2lfkz9`) — the full app.

## Part B — Point visiosolutions.net at Vercel

6. In the project → **Settings → Domains** → add `visiosolutions.net` (and `www.visiosolutions.net`).
7. Vercel shows the **exact DNS records** to create. Use the values Vercel displays —
   they're the source of truth. They'll look like:

   | Type | Name / Host | Value (use what Vercel shows) |
   | --- | --- | --- |
   | A | `@` (apex) | the IP Vercel displays |
   | CNAME | `www` | the target Vercel displays (e.g. `cname.vercel-dns.com`) |

8. At **Hostinger**: hPanel → **Domains → visiosolutions.net → DNS / Nameservers** (DNS Zone editor).
   - The domain must use **Hostinger nameservers** to edit records here (it normally does if it's on your Hostinger plan).
   - **Replace the apex `A` record** (`@`) with the IP Vercel gave (remove the old Hostinger IP).
   - **Add a `CNAME`** for `www` → the target Vercel gave.
   - **Leave MX / email records untouched.**
9. Back in Vercel → Domains, wait for **Valid Configuration**. Vercel **auto-issues SSL**.
   DNS can take a few minutes to a few hours.
10. Open **https://visiosolutions.net** — live, over HTTPS.

## Contact form (one optional follow-up)

On Vercel the form's server endpoint runs, but to actually **email** you it needs a
delivery key. In Vercel → **Settings → Environment Variables** add:

```
CONTACT_EMAIL_PROVIDER = resend
RESEND_API_KEY = <from resend.com>
CONTACT_TO_EMAIL = support@visiosolutions.net
CONTACT_FROM_EMAIL = website@visiosolutions.net
```

Then **Redeploy**. (Get a free key at <https://resend.com> and verify your domain
for best deliverability.) Until then, submissions succeed but aren't emailed; the
contact page still shows your email address.

---

## Prompt for the Claude Chrome extension — copy the whole box

```
You are helping me put my website live at visiosolutions.net by deploying it on Vercel (free) and pointing my Hostinger domain at it. My GitHub repo is public: sameerhameedbaba-stack/visio-solutions-inc (a Next.js app). Work step by step. Whenever you hit a login screen or anything ambiguous, pause and ask me.

PART A — Deploy on Vercel
1. Go to https://vercel.com. If I am not logged in, tell me to log in with GitHub (the account that owns the repo) and wait for me.
2. Click "Add New..." then "Project".
3. Under "Import Git Repository", find "sameerhameedbaba-stack/visio-solutions-inc" and click Import. If it is not listed, click the option to configure/adjust GitHub App permissions, grant Vercel access to that repo, then return and Import it.
4. On the configure screen, confirm the framework is detected as "Next.js". Leave the default Build and Output settings. Do NOT add a STATIC_EXPORT variable. You may skip Environment Variables for now.
5. Click Deploy and wait until it finishes (1-3 minutes). Open the generated *.vercel.app URL and confirm the homepage loads (its main heading contains "Build smarter digital systems"). Tell me the preview URL.

PART B — Connect the domain
6. In the new Vercel project open Settings -> Domains. Enter visiosolutions.net and click Add. Also add www.visiosolutions.net if offered.
7. Vercel will display the exact DNS records to create (usually an A record for the apex "@" with an IP, and a CNAME for "www"). Read the exact values back to me.
8. Open a new tab to https://hpanel.hostinger.com and go to Domains -> visiosolutions.net -> DNS / Nameservers (the DNS Zone editor). If it says the domain uses external/other nameservers, stop and tell me.
9. In the DNS zone: edit the existing A record for host "@" to the IP Vercel gave (replacing the old one), and add a CNAME record for host "www" to the target Vercel gave. Do NOT change or delete any MX or email records. Show me each change and let me confirm before saving.
10. Return to Vercel -> Settings -> Domains and wait until visiosolutions.net shows "Valid Configuration". SSL is issued automatically; this can take a few minutes to a few hours.
11. Open https://visiosolutions.net and confirm it loads over HTTPS. Report the status and anything that looked wrong.

GUARDRAILS
- Only edit the DNS records needed to point visiosolutions.net to Vercel. Never touch MX/email records or any other domain.
- Confirm with me before saving DNS changes or deleting any record.
- Pause for me at any login screen. If a screen differs from these steps, stop and describe what you see instead of guessing.
```
