import { describe, expect, it, vi } from 'vitest';
import {
  deliverContactSubmission,
  escapeHtml,
  getEmailProvider,
  sanitizeHeaderValue,
} from '@/lib/email';
import type { ContactInput } from '@/lib/validation';

const submission: ContactInput = {
  fullName: 'Jane Doe',
  workEmail: 'jane@acme.com',
  company: 'Acme Inc',
  phone: '',
  service: 'Custom Software Development',
  projectStage: 'Defining requirements',
  budget: 'Prefer to discuss',
  timeline: 'Within 1–3 months',
  projectDescription: 'A description that comfortably exceeds twenty characters in length.',
  consent: true,
  companyWebsite: '',
};

describe('escapeHtml', () => {
  it('escapes HTML-significant characters', () => {
    expect(escapeHtml('<script>"&\'')).toBe('&lt;script&gt;&quot;&amp;&#39;');
  });
});

describe('sanitizeHeaderValue', () => {
  it('strips CR/LF to prevent header injection', () => {
    expect(sanitizeHeaderValue('subject\r\nBcc: attacker@evil.com')).toBe(
      'subject Bcc: attacker@evil.com',
    );
  });
});

describe('email provider abstraction', () => {
  it('defaults to the console provider when nothing is configured', () => {
    const provider = getEmailProvider();
    expect(provider.name).toBe('console');
  });

  it('delivers successfully via the console provider without throwing', async () => {
    const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const result = await deliverContactSubmission(submission);
    expect(result.ok).toBe(true);
    expect(result.provider).toBe('console');
    // Sensitive fields must NOT appear in logs.
    const logged = spy.mock.calls.flat().join(' ');
    expect(logged).not.toContain('jane@acme.com');
    expect(logged).not.toContain('Jane Doe');
    spy.mockRestore();
  });
});
