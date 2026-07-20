import { describe, expect, it } from 'vitest';
import {
  budgetOptions,
  contactSchema,
  flattenContactErrors,
  serviceOptions,
} from '@/lib/validation';

const validPayload = {
  fullName: 'Jane Doe',
  workEmail: 'jane@acme.com',
  company: 'Acme Inc',
  phone: '+1 555 123 4567',
  service: 'Custom Software Development',
  projectStage: 'Defining requirements',
  budget: 'Prefer to discuss',
  timeline: 'Within 1–3 months',
  projectDescription:
    'We need to replace a legacy internal tool with a custom operations platform.',
  consent: true,
  companyWebsite: '',
};

describe('contactSchema', () => {
  it('accepts a valid payload', () => {
    const result = contactSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('rejects an invalid email', () => {
    const result = contactSchema.safeParse({ ...validPayload, workEmail: 'not-an-email' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(flattenContactErrors(result.error).workEmail).toBeDefined();
    }
  });

  it('requires consent to be true', () => {
    const result = contactSchema.safeParse({ ...validPayload, consent: false });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(flattenContactErrors(result.error).consent).toBeDefined();
    }
  });

  it('rejects a missing full name', () => {
    const result = contactSchema.safeParse({ ...validPayload, fullName: '' });
    expect(result.success).toBe(false);
  });

  it('rejects a too-short project description', () => {
    const result = contactSchema.safeParse({ ...validPayload, projectDescription: 'too short' });
    expect(result.success).toBe(false);
  });

  it('enforces the project description maximum length', () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      projectDescription: 'a'.repeat(4001),
    });
    expect(result.success).toBe(false);
  });

  it('only allows allowlisted select values', () => {
    const result = contactSchema.safeParse({ ...validPayload, service: 'Something Made Up' });
    expect(result.success).toBe(false);
  });

  it('treats phone as optional', () => {
    const result = contactSchema.safeParse({ ...validPayload, phone: '' });
    expect(result.success).toBe(true);
  });

  it('rejects an invalid phone number', () => {
    const result = contactSchema.safeParse({ ...validPayload, phone: 'call-me-maybe!!!' });
    expect(result.success).toBe(false);
  });

  it('exposes stable option lists for the UI', () => {
    expect(serviceOptions).toContain('Not Sure Yet');
    expect(budgetOptions).toContain('Prefer to discuss');
  });
});
