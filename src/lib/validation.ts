import { z } from 'zod';

/**
 * Contact form schema — the single source of validation truth, used on both the
 * client (React) and the server (API route). Select fields are allowlisted so
 * only known values are accepted. Length limits guard against abuse.
 */

export const serviceOptions = [
  'Agentic AI Solutions',
  'AI Agents and Automation',
  'Automated Software Development',
  'Custom Software Development',
  'Web and Application Development',
  'AI-Powered Cybersecurity',
  'Digital Marketing and Growth',
  'Technology Consulting',
  'Not Sure Yet',
] as const;

export const projectStageOptions = [
  'Exploring options',
  'Defining requirements',
  'Ready to begin',
  'Existing project needs support',
  'Existing system needs improvement',
] as const;

export const budgetOptions = [
  'Budget not yet defined',
  'Prefer to discuss',
  'Under $25,000',
  '$25,000 – $75,000',
  '$75,000 – $150,000',
  'More than $150,000',
] as const;

export const timelineOptions = [
  'As soon as practical',
  'Within 1–3 months',
  'Within 3–6 months',
  'More than 6 months',
  'Exploring only',
] as const;

const optionalPhone = z
  .string()
  .trim()
  .max(25, 'Phone number is too long.')
  .regex(/^[+()\-.\s0-9]{7,25}$/, 'Enter a valid phone number.')
  .optional()
  .or(z.literal(''));

// Only name, work email, project description, and consent are required — the
// rest are optional to reduce first-touch friction. Optional selects accept an
// empty string (unselected) or one allowlisted value.
export const contactSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name.').max(100, 'Name is too long.'),
  workEmail: z
    .string()
    .trim()
    .min(5, 'Please enter your work email.')
    .max(254, 'Email is too long.')
    .email('Enter a valid email address.'),
  company: z.string().trim().max(150, 'Company name is too long.').optional().or(z.literal('')),
  phone: optionalPhone,
  service: z.enum(serviceOptions).optional().or(z.literal('')),
  projectStage: z.enum(projectStageOptions).optional().or(z.literal('')),
  budget: z.enum(budgetOptions).optional().or(z.literal('')),
  timeline: z.enum(timelineOptions).optional().or(z.literal('')),
  projectDescription: z
    .string()
    .trim()
    .min(20, 'Please describe your project in at least 20 characters.')
    .max(4000, 'Description is too long (4000 character maximum).'),
  consent: z.literal(true, {
    message: 'Please confirm you agree to be contacted about your inquiry.',
  }),
  // Honeypot: must remain empty. Bots that fill every field will populate it.
  companyWebsite: z.literal('').optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Field-level error map keyed by field name. */
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

/** Flatten a ZodError into a simple field -> message map. */
export function flattenContactErrors(error: z.ZodError<ContactInput>): ContactErrors {
  const result: ContactErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof ContactInput | undefined;
    if (key && !result[key]) {
      result[key] = issue.message;
    }
  }
  return result;
}
