# Automatic deploy: GitHub → Hostinger (no manual uploads)

This is the real "connect GitHub and Hostinger and get it all done" setup. Once
configured, **every push to GitHub builds the site and uploads it to your
Hostinger `public_html` automatically** — no zip, no File Manager, no clicking.

The pipeline is defined in `.github/workflows/deploy-hostinger.yml`.

## One-time setup (about 5 minutes)

### 1. Get your Hostinger FTP details
In hPanel: **Files → FTP Accounts**. Note (or create an account and note):
- **FTP hostname / IP** (e.g. something like `147.79.x.x` or `ftp.visiosolutions.net`)
- **FTP username**
- **FTP password** (you can reset it here if unknown)

### 2. Add them as GitHub repository secrets
In the GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**.
Add each of these (names must match exactly):

| Secret name | Value |
| --- | --- |
| `FTP_SERVER` | your Hostinger FTP hostname/IP |
| `FTP_USERNAME` | your Hostinger FTP username |
| `FTP_PASSWORD` | your Hostinger FTP password |
| `WEB3FORMS_KEY` *(optional)* | a free key from web3forms.com so the contact form emails you |

Secrets are encrypted and never shown again — this is the safe way to give GitHub
access to Hostinger (far safer than putting passwords in a browser extension).

### 3. Run it
Go to the repo's **Actions** tab → **Deploy to Hostinger** → **Run workflow**
(or just push any change). It will:
1. Build the static site.
2. Upload it into `public_html` over FTP.

Then open **https://visiosolutions.net** — live. Every future push redeploys
automatically.

## Notes & troubleshooting

- **Where files land:** `server-dir` is set to `public_html/` (correct for the
  primary domain). If your FTP account is already rooted *inside* `public_html`,
  edit the workflow and set `server-dir: ./`.
- **FTP vs FTPS:** the workflow uses `ftps` (secure). If Hostinger rejects it,
  change `protocol: ftps` to `protocol: ftp` in the workflow.
- **SSL:** make sure SSL / Force HTTPS is enabled once in hPanel → **SSL**.
- **First run replaces the site contents** in `public_html`; it keeps a small
  sync-state file so later runs only upload what changed.
- The Action skips the deploy step until `FTP_SERVER` is set, so it never errors
  before you've added the secrets.
