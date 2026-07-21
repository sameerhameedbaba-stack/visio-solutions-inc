'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState, type FormEvent } from 'react';
import {
  budgetOptions,
  contactSchema,
  flattenContactErrors,
  projectStageOptions,
  serviceOptions,
  timelineOptions,
  type ContactErrors,
  type ContactInput,
} from '@/lib/validation';
import { trackEvent } from '@/lib/analytics';
import { company } from '@/content/company';
import { Button } from '@/components/ui/Button';
import { FormField } from './FormField';

type Status = 'idle' | 'submitting' | 'error' | 'network-error' | 'mailto';

/**
 * Optional Web3Forms access key. When set (typically for a static export on
 * shared hosting where the Node API route is unavailable), submissions are sent
 * to Web3Forms instead of `/api/contact`. The key is a public identifier and is
 * safe to expose client-side.
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

/** Map a validated submission to a readable Web3Forms payload. */
function toWeb3FormsPayload(data: ContactInput) {
  return {
    access_key: WEB3FORMS_KEY,
    subject: `New website inquiry — ${data.service || 'General'} — ${data.company || data.fullName}`,
    from_name: data.fullName,
    replyto: data.workEmail,
    'Full name': data.fullName,
    'Work email': data.workEmail,
    Company: data.company || '—',
    Phone: data.phone || '—',
    'Service needed': data.service || '—',
    'Project stage': data.projectStage || '—',
    'Estimated budget': data.budget || '—',
    Timeline: data.timeline || '—',
    'Project description': data.projectDescription,
    // Web3Forms spam honeypot — must stay empty.
    botcheck: '',
  };
}

/**
 * True when built as a static export (no Node server). Set by the build:static
 * script. In that mode, if no Web3Forms key is configured, the form falls back to
 * a pre-filled mailto so a submission is never silently lost.
 */
const IS_STATIC = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';

/** Build a mailto: link pre-filled with the submitted details (fallback path). */
function buildMailtoHref(data: ContactInput): string {
  const body = [
    `Full name: ${data.fullName}`,
    `Work email: ${data.workEmail}`,
    `Company: ${data.company || '—'}`,
    `Phone: ${data.phone || '—'}`,
    `Service needed: ${data.service || '—'}`,
    `Project stage: ${data.projectStage || '—'}`,
    `Estimated budget: ${data.budget || '—'}`,
    `Timeline: ${data.timeline || '—'}`,
    '',
    'Project description:',
    data.projectDescription,
  ].join('\n');
  return `mailto:${company.email}?subject=${encodeURIComponent(
    `Website inquiry — ${data.service || 'General'}`,
  )}&body=${encodeURIComponent(body)}`;
}

const initialValues = {
  fullName: '',
  workEmail: '',
  company: '',
  phone: '',
  service: '',
  projectStage: '',
  budget: '',
  timeline: '',
  projectDescription: '',
  consent: false,
  companyWebsite: '', // honeypot
};

const fieldLabels: Record<keyof ContactInput, string> = {
  fullName: 'Full name',
  workEmail: 'Work email',
  company: 'Company',
  phone: 'Phone',
  service: 'Service needed',
  projectStage: 'Project stage',
  budget: 'Estimated budget',
  timeline: 'Timeline',
  projectDescription: 'Project description',
  consent: 'Consent',
  companyWebsite: 'Company website',
};

export function ContactForm() {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [startTracked, setStartTracked] = useState(false);
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);

  function update<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (!startTracked) {
      trackEvent('contact_form_start');
      setStartTracked(true);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return; // prevent duplicate submission

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = flattenContactErrors(parsed.error);
      setErrors(fieldErrors);
      setStatus('error');
      trackEvent('contact_form_error', { reason: 'client_validation' });
      // Move focus to the error summary for assistive technology.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setErrors({});

    // Static export with no Web3Forms key: there is no backend to POST to, so
    // offer a pre-filled email instead of a doomed request.
    if (IS_STATIC && !WEB3FORMS_KEY) {
      setMailtoHref(buildMailtoHref(parsed.data));
      setStatus('mailto');
      trackEvent('contact_form_mailto', { service: parsed.data.service });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus('submitting');

    try {
      // On static hosting (no Node server) a Web3Forms access key routes the
      // submission to a hosted form endpoint. Otherwise the built-in server API
      // route is used. Both are configured via environment variables.
      const response = WEB3FORMS_KEY
        ? await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(toWeb3FormsPayload(parsed.data)),
          })
        : await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(parsed.data),
          });

      if (response.ok) {
        trackEvent('contact_form_success', { service: parsed.data.service });
        router.push('/thank-you');
        return;
      }

      // The server API route can return per-field validation errors; Web3Forms
      // does not (client validation already passed).
      if (!WEB3FORMS_KEY) {
        const data = (await response.json().catch(() => null)) as {
          errors?: ContactErrors;
          message?: string;
        } | null;
        if (data?.errors) {
          setErrors(data.errors);
        }
      }
      setStatus('error');
      trackEvent('contact_form_error', { reason: 'submit_failed' });
      requestAnimationFrame(() => summaryRef.current?.focus());
    } catch {
      setStatus('network-error');
      trackEvent('contact_form_error', { reason: 'network' });
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  const errorEntries = Object.entries(errors) as [keyof ContactInput, string][];
  const showSummary = status === 'error' && errorEntries.length > 0;
  const submitting = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Live region for status announcements */}
      <div aria-live="polite" role="status" className="sr-only">
        {submitting ? 'Submitting your inquiry.' : ''}
      </div>

      {showSummary && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-card border border-error/40 bg-error/10 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error"
        >
          <p className="text-sm font-semibold text-error">Please correct the following:</p>
          <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
            {errorEntries.map(([key, message]) => (
              <li key={key}>
                <a href={`#field-${key}`} className="underline">
                  {fieldLabels[key]}
                </a>
                : {message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {status === 'network-error' && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-card border border-error/40 bg-error/10 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error"
        >
          <p className="text-sm text-muted-foreground">
            We couldn’t submit your message. Please try again, or email us directly at{' '}
            <a href={`mailto:${company.email}`} className="font-medium text-accent underline">
              {company.email}
            </a>
            .
          </p>
        </div>
      )}

      {status === 'mailto' && mailtoHref && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="status"
          className="rounded-card border border-brand/30 bg-brand/5 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <p className="text-sm font-semibold text-foreground">One quick step to send</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Your details are ready. Click below to open your email app with everything filled in, then
            hit send — it goes straight to our team.
          </p>
          <a
            href={mailtoHref}
            className="mt-3 inline-flex min-h-[44px] items-center justify-center rounded-input bg-brand px-5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Open pre-filled email
          </a>
          <p className="mt-3 text-xs text-subtle-foreground">
            Prefer not to use email? Write to us directly at{' '}
            <a href={`mailto:${company.email}`} className="font-medium text-accent underline">
              {company.email}
            </a>
            .
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          control="input"
          id="field-fullName"
          name="fullName"
          label="Full name"
          required
          autoComplete="name"
          maxLength={100}
          value={values.fullName}
          onChange={(e) => update('fullName', e.target.value)}
          error={errors.fullName}
        />
        <FormField
          control="input"
          id="field-workEmail"
          name="workEmail"
          label="Work email"
          type="email"
          required
          autoComplete="email"
          maxLength={254}
          value={values.workEmail}
          onChange={(e) => update('workEmail', e.target.value)}
          error={errors.workEmail}
        />
        <FormField
          control="input"
          id="field-company"
          name="company"
          label="Company"
          autoComplete="organization"
          maxLength={150}
          value={values.company}
          onChange={(e) => update('company', e.target.value)}
          error={errors.company}
        />
        <FormField
          control="input"
          id="field-phone"
          name="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          maxLength={25}
          value={values.phone}
          onChange={(e) => update('phone', e.target.value)}
          error={errors.phone}
        />
        <FormField
          control="select"
          id="field-service"
          name="service"
          label="Service needed"
          options={serviceOptions}
          value={values.service}
          onChange={(e) => update('service', e.target.value)}
          error={errors.service}
        />
        <FormField
          control="select"
          id="field-projectStage"
          name="projectStage"
          label="Project stage"
          options={projectStageOptions}
          value={values.projectStage}
          onChange={(e) => update('projectStage', e.target.value)}
          error={errors.projectStage}
        />
        <FormField
          control="select"
          id="field-budget"
          name="budget"
          label="Estimated budget"
          helpText="Rough ranges only — this helps us suggest an appropriate approach."
          options={budgetOptions}
          value={values.budget}
          onChange={(e) => update('budget', e.target.value)}
          error={errors.budget}
        />
        <FormField
          control="select"
          id="field-timeline"
          name="timeline"
          label="Timeline"
          options={timelineOptions}
          value={values.timeline}
          onChange={(e) => update('timeline', e.target.value)}
          error={errors.timeline}
        />
      </div>

      <FormField
        control="textarea"
        id="field-projectDescription"
        name="projectDescription"
        label="Project description"
        required
        helpText="What are you trying to achieve? Include the systems involved and any constraints (20–4000 characters)."
        maxLength={4000}
        rows={6}
        value={values.projectDescription}
        onChange={(e) => update('projectDescription', e.target.value)}
        error={errors.projectDescription}
      />

      {/* Honeypot — hidden from users and assistive tech, catches bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="field-companyWebsite">Company website (leave blank)</label>
        <input
          id="field-companyWebsite"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.companyWebsite}
          onChange={(e) => update('companyWebsite', e.target.value)}
        />
      </div>

      {/* Consent */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-3">
          <input
            id="field-consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update('consent', e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? 'field-consent-error' : undefined}
            className="mt-1 h-5 w-5 flex-shrink-0 rounded border-border text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          />
          <label htmlFor="field-consent" className="text-sm text-muted-foreground">
            I agree to be contacted about my inquiry and understand my information will be handled
            per the{' '}
            <a href="/privacy" className="font-medium text-accent underline">
              Privacy Policy
            </a>
            .
            <span className="ml-0.5 text-error" aria-hidden="true">
              *
            </span>
          </label>
        </div>
        {errors.consent && (
          <p id="field-consent-error" className="text-sm text-error">
            {errors.consent}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" loading={submitting} disabled={submitting}>
          {submitting ? 'Submitting…' : 'Send inquiry'}
        </Button>
        <p className="text-xs text-subtle-foreground">
          Share the context of your project, and the team can evaluate the most appropriate next
          step.
        </p>
      </div>
    </form>
  );
}
