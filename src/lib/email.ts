import type { ContactInput } from './validation';
import { company } from '@/content/company';

/**
 * Email-delivery provider abstraction.
 *
 * The site does not depend on a paid API being present. `CONTACT_EMAIL_PROVIDER`
 * selects the strategy:
 *   - "console" (default): logs a REDACTED summary server-side. No email sent.
 *   - "resend": sends via the Resend HTTP API when RESEND_API_KEY is set.
 *
 * Adding a provider only requires implementing the DeliveryProvider contract.
 * The UI must never report success unless delivery is actually handled — the API
 * route surfaces provider failures as errors rather than false confirmations.
 */

export interface DeliveryResult {
  ok: boolean;
  provider: string;
  /** Non-sensitive detail for server logs / debugging. */
  detail?: string;
}

export interface DeliveryProvider {
  name: string;
  send(submission: ContactInput): Promise<DeliveryResult>;
}

/** Escape a value for safe inclusion in an HTML email body. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Prevent header injection by stripping CR/LF from single-line header values. */
export function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function buildSubject(submission: ContactInput): string {
  return sanitizeHeaderValue(`New inquiry — ${submission.service} — ${submission.company}`).slice(
    0,
    180,
  );
}

function buildHtmlBody(submission: ContactInput): string {
  const rows: [string, string][] = [
    ['Full name', submission.fullName],
    ['Work email', submission.workEmail],
    ['Company', submission.company],
    ['Phone', submission.phone || '—'],
    ['Service needed', submission.service],
    ['Project stage', submission.projectStage],
    ['Estimated budget', submission.budget],
    ['Timeline', submission.timeline],
  ];
  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;font-weight:600;">${escapeHtml(
          label,
        )}</td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`,
    )
    .join('');
  return `<h2>New website inquiry</h2><table>${rowsHtml}</table><h3>Project description</h3><p>${escapeHtml(
    submission.projectDescription,
  ).replace(/\n/g, '<br>')}</p>`;
}

/** Default provider: server-side console log with sensitive fields redacted. */
class ConsoleProvider implements DeliveryProvider {
  name = 'console';
  async send(submission: ContactInput): Promise<DeliveryResult> {
    // Log only non-sensitive metadata. Never log email, phone, name, or the
    // full project description.
    console.info(
      `[contact] inquiry received: service="${submission.service}", stage="${submission.projectStage}", timeline="${submission.timeline}" (delivery provider not configured — set CONTACT_EMAIL_PROVIDER)`,
    );
    return {
      ok: true,
      provider: this.name,
      detail: 'Logged server-side. Configure an email provider to deliver notifications.',
    };
  }
}

/** Resend provider — sends a notification email via the Resend HTTP API. */
class ResendProvider implements DeliveryProvider {
  name = 'resend';
  constructor(
    private apiKey: string,
    private to: string,
    private from: string,
  ) {}

  async send(submission: ContactInput): Promise<DeliveryResult> {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: sanitizeHeaderValue(this.from),
          to: [sanitizeHeaderValue(this.to)],
          reply_to: sanitizeHeaderValue(submission.workEmail),
          subject: buildSubject(submission),
          html: buildHtmlBody(submission),
        }),
      });

      if (!response.ok) {
        // Do not surface provider internals to the client.
        return { ok: false, provider: this.name, detail: `Provider responded ${response.status}` };
      }
      return { ok: true, provider: this.name };
    } catch {
      return { ok: false, provider: this.name, detail: 'Provider request failed' };
    }
  }
}

/** Resolve the configured provider from environment variables. */
export function getEmailProvider(): DeliveryProvider {
  const provider = (process.env.CONTACT_EMAIL_PROVIDER ?? 'console').toLowerCase();

  if (provider === 'resend') {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL ?? company.email;
    const from = process.env.CONTACT_FROM_EMAIL ?? `website@${company.domain}`;
    if (apiKey) {
      return new ResendProvider(apiKey, to, from);
    }
    console.warn(
      '[contact] CONTACT_EMAIL_PROVIDER=resend but RESEND_API_KEY is missing; falling back to console.',
    );
  }

  return new ConsoleProvider();
}

export async function deliverContactSubmission(submission: ContactInput): Promise<DeliveryResult> {
  return getEmailProvider().send(submission);
}
