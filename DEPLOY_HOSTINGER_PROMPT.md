# Deploy to Hostinger — prompt for the Claude Chrome extension

This guide gets `visiosolutions.net` live on your **Hostinger shared web hosting**
using the **Claude for Chrome** extension to drive the Hostinger control panel
(hPanel). The site has been built as static files, so it runs on shared hosting
with no server setup.

## Before you start (do these yourself — 2 minutes)

1. **Download the site package** `visiosolutions-site.zip` (sent to you in the
   chat) to your computer — the Downloads folder is fine.
2. **Log in to Hostinger** in Chrome: <https://hpanel.hostinger.com>. Make sure
   you can see `visiosolutions.net` in your Websites list.
3. Open the **Claude for Chrome** extension on the Hostinger tab and paste the
   prompt below.

> Note on file uploads: a browser assistant cannot open your computer's file
> picker. When it clicks **Upload**, it will pause and ask you to choose
> `visiosolutions-site.zip` — you just pick the file, then it continues.

---

## The prompt — copy everything in the box and paste it into Claude for Chrome

```
You are helping me deploy a pre-built static website to my existing Hostinger
shared hosting. I am already logged in to Hostinger in this browser. The website
files are packaged in a file called "visiosolutions-site.zip" that is saved on my
computer (in Downloads). The domain is visiosolutions.net.

Goal: upload and extract that zip into the document root of visiosolutions.net so
the site goes live, make sure HTTPS is on, and confirm the site loads. Work one
step at a time, and show me what you see before deleting anything.

STEP 1 — Open the file manager
- Go to https://hpanel.hostinger.com, open the Websites list, and click
  visiosolutions.net.
- In its dashboard open Files -> File Manager. It should open at the folder
  "public_html". If it opens elsewhere, navigate into public_html.
- If visiosolutions.net is an add-on domain with its own folder (for example
  public_html/visiosolutions.net), use that folder as the document root and tell
  me which folder you are using.

STEP 2 — Show me the current contents
- List what is currently in the document root. If it only has Hostinger's default
  placeholder files (such as default.php or a default index.html), tell me and
  wait for my confirmation before removing them. Do NOT delete anything yet, and
  never touch folders belonging to any other website.

STEP 3 — Upload the zip
- Make sure you are inside the document root, then click the Upload button.
- When the file-selection dialog opens, STOP and tell me — I will choose
  visiosolutions-site.zip myself because you cannot open my computer's file
  picker. Wait until I confirm the upload has finished.

STEP 4 — Extract the zip
- When visiosolutions-site.zip appears in the document root, right-click it and
  choose Extract (into the current folder). The zip contains the site files at its
  top level (index.html, a _next folder, page folders, and a hidden .htaccess), so
  they must land directly in the document root, not inside a subfolder.
- If extraction created a subfolder, move all of its contents up so that
  index.html sits directly in the document root.

STEP 5 — Verify the files
- Confirm the document root now contains: index.html, 404.html, robots.txt,
  sitemap.xml, a _next folder, and folders such as about, services, and contact.
- Turn on "show hidden files" if there is a toggle, and confirm a .htaccess file
  is present in the document root. If it is missing, tell me.
- Delete the leftover visiosolutions-site.zip from the server to keep it tidy
  (that file is safe to delete).

STEP 6 — Make sure HTTPS is on
- In hPanel for visiosolutions.net, open Security -> SSL. If an SSL certificate is
  active, good. If not, install the free SSL and enable "Force HTTPS". Tell me the
  status.

STEP 7 — Verify it is live
- Open a new tab to https://visiosolutions.net and confirm the homepage loads. The
  main heading should read: "Build smarter digital systems with software, AI,
  automation, security, and growth working together."
- Also open https://visiosolutions.net/services/ and
  https://visiosolutions.net/contact/ and confirm they load without errors.
- Report back: which pages loaded, whether the padlock/HTTPS is active, and
  anything that looked wrong.

GUARDRAILS
- Only work inside visiosolutions.net's document root. Do NOT change DNS,
  nameservers, email, databases, or any other website.
- Ask me before deleting anything except the uploaded zip.
- If a screen looks different from these steps or anything is ambiguous, stop and
  describe what you see instead of guessing.
```

---

## After it's live

- **If the site doesn't appear at all**, the domain may not be pointed at
  Hostinger yet. In hPanel check that `visiosolutions.net` is connected to this
  hosting plan (Domains → point/connect domain, or set nameservers to Hostinger).
  DNS changes can take up to a few hours.
- **Old version cached?** Hard-refresh (Ctrl/Cmd + Shift + R) or try a private
  window.

## One recommended follow-up — make the contact form deliver email

The site is fully functional, but on static hosting the contact form needs a free
form service to email you submissions. Two minutes:

1. Go to <https://web3forms.com>, enter `support@visiosolutions.net`, and copy the
   **access key** they email you (it's a public key, safe to embed).
2. Send me that key and I'll rebuild `visiosolutions-site.zip` with it wired in —
   then re-run the upload steps above. Until then, the contact page still shows
   your email and a working "email us" link, so no visitor is stranded.

## Rebuilding the package yourself (optional)

From the project, with the key:

```bash
NEXT_PUBLIC_SITE_URL=https://visiosolutions.net \
NEXT_PUBLIC_WEB3FORMS_KEY=your-web3forms-key \
npm run build:static
# then zip the CONTENTS of out/ (including .htaccess) into visiosolutions-site.zip
```
