# Payment gateway setup

Three URLs are needed by the payment provider's configuration screen (the form with
**Cancel Page**, **Success Page**, and **Instant Payment Notification Address**). All
three now exist on the site.

## The three values to paste

Use `https://`, the apex domain, and keep the trailing slashes exactly as written.

| Field in the provider's form             | Paste this                                                            |
| ---------------------------------------- | --------------------------------------------------------------------- |
| **Cancel Page**                          | `https://visiosolutions.net/payment/cancel/`                          |
| **Success Page**                         | `https://visiosolutions.net/payment/success/`                         |
| **Instant Payment Notification Address** | `https://visiosolutions.net/payment/notify.php?ChkID={0}&TransID={1}` |

Leave `{0}` and `{1}` exactly as they are — the provider substitutes the real values.

**Use `https://`, not `http://`.** The site 301-redirects all plain HTTP to HTTPS. A
browser handles that fine, but a server-to-server notification does not: older .NET
HTTP clients follow the redirect by turning the POST into a GET and dropping the body,
so the notification arrives empty. Register the HTTPS URL directly.

## What each one is

**`/payment/success/`** — where the provider sends the customer's browser after they
complete a payment. It thanks them, shows the `ChkID` / `TransID` from the URL as a
reference, and explains what happens next. It is a plain page: it does not create an
order, send a receipt, grant access, or record anything.

**`/payment/cancel/`** — where the provider sends the customer if they back out before
paying. It confirms nothing was charged and offers a way to retry or contact us.

**`/payment/notify.php`** — the notification receiver. The provider's servers call this
directly, with no browser involved. It records the notification and answers `200 OK`.
Source: `public/payment/notify.php` (copied into the deployed site by the build, so it
is never wiped by a redeploy).

## Read this before relying on any of it

A customer landing on `/payment/success/` proves only that a browser loaded a URL.
Anyone can type that address, bookmark it, or share it. Equally, a real payment can
succeed while the customer closes the tab and never reaches the page at all.

The notification endpoint is public and unauthenticated too: a recorded notification
means something called the URL, not that money moved.

So: **confirm every payment in the provider's own dashboard before releasing anything
of value.** For e-check / ACH payments there are three separate states — submitted,
settled, and returned — and only the provider's records and your bank statement say
which one a given `ChkID` is in today. A payment accepted today can still be returned
days later (insufficient funds, closed account, disputed debit).

## Ask the provider three questions

The site handles either behaviour, but these answers let you tighten the setup and
know what to expect:

1. **Method and parameters** — does the notification arrive as GET or POST, and what is
   the complete list of parameters? Two parameters is unusually few; there may be a
   status or amount field the example does not show.
2. **Source IP ranges** — which addresses do their servers call from? With those you can
   turn on the allowlist below.
3. **Retries** — do they retry when the endpoint does not answer `200`, how many times,
   and over what period?

Also worth confirming: whether later status changes (settlement, a returned debit)
generate another notification on the same `ChkID`, or whether someone has to check the
dashboard for that.

## Optional hardening

Both are off by default. Copy `public/payment/notify-config.example.php` to **either**:

- `<parent of public_html>/visio-payment-ipn/notify-config.php` — preferred, because it
  sits outside the web root and survives a redeploy that replaces `public_html`; or
- `public_html/payment/notify-config.php` — simpler, but deleted on each redeploy.

Then edit it:

**Shared secret.** Set `shared_secret` to a long random string and append it to the URL
in the provider's form:

```
https://visiosolutions.net/payment/notify.php?ChkID={0}&TransID={1}&token=YOUR_SECRET
```

Requests without a matching token get `403`. Only do this if the provider's form accepts
the extra parameter. Never commit the secret to the repository.

**IP allowlist.** Set `allowed_ips` to the provider's ranges, e.g.
`['203.0.113.7', '198.51.100.0/24']`. A wrong or stale entry silently drops every real
notification, so only enable it with ranges the provider has given you in writing.

## Where notifications end up

**A log file outside the web root**, so it can never be fetched over HTTP:
`<parent of public_html>/visio-payment-ipn/ipn.log`. One JSON line per notification —
timestamp, method, source IP, path, and the parameters. It rotates at 2 MB and keeps one
previous file.

**An email** to `support@visiosolutions.net` for any notification that carries a `ChkID`
or `TransID`, capped at 40 per hour so a flood of requests to the public URL cannot
become a flood of email. Change the address or turn email off in the config file.

Parameters whose names look like bank or card details (`account`, `routing`, `cvv`,
`card`, `token`, `signature`, and similar) are recorded as `[redacted]` — the field name
is kept so you can see it arrived, the value is not written down anywhere.

## Testing it

After deploying, from any machine:

```bash
curl -i "https://visiosolutions.net/payment/notify.php?ChkID=TEST123&TransID=TEST456"
```

Expect `HTTP/1.1 200 OK` and a body of `OK`. Then check that the email arrived and that
the line appears in `ipn.log` (via hPanel's File Manager or SSH).

Then run one real minimum-value transaction end to end and confirm all three: the
success page renders with the reference, the notification email arrives, and the
transaction appears in the provider's dashboard.

## If a payment button is added later

The site's Content-Security-Policy currently blocks form submissions to any other
origin, so a "Pay now" form posting to the gateway would fail silently. Build with the
gateway's origin set:

```bash
PAYMENT_GATEWAY_ORIGIN=https://checkout.example.com npm run build:static
```

That adds the origin to `form-action`, `connect-src`, and `frame-src` in the generated
`.htaccess`.

## Troubleshooting

**Notifications never arrive.** Check the URL is registered with `https://` and the
apex domain. If the provider's client is an old .NET application it may only speak
TLS 1.0/1.1, which the host no longer accepts — the fix is on their side; do not
downgrade the endpoint to HTTP, which would put transaction identifiers on the open
wire. Also check the provider is not being blocked by a host-level firewall or bot
protection.

**The form rejects the URL.** If it will not accept a query string, register
`https://visiosolutions.net/payment/notify.php` on its own — the endpoint reads
parameters from the query string, a form body, or a JSON body. If it insists on a
`.htm`/`.html` extension, tell us and we will add a handler mapping for it.

**`403` responses.** Either the shared secret does not match or the IP allowlist is
excluding the provider. Clear `allowed_ips` and re-test.

**The success page shows no reference.** The provider is not appending the identifiers
to the success URL. If their form allows it, change the Success Page value to
`https://visiosolutions.net/payment/success/?ChkID={0}&TransID={1}` and the page will
display them.

## Not included

These three URLs are the integration surface only. Deciding what is being sold, at what
price, with what refund terms — and adding a refund/cancellation policy page, which many
providers require during merchant review — is separate work. Say the word and it can be
added.
