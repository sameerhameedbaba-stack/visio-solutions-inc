import { company, formattedAddress } from './company';

/**
 * DRAFT LEGAL CONTENT — requires review and approval by a qualified attorney
 * before publication. See MISSING_INPUTS.md and LAUNCH_CHECKLIST.md. These drafts
 * intentionally avoid false legal assurances and flag items needing confirmation.
 */
export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalDocument {
  title: string;
  slug: string;
  seoTitle: string;
  metaDescription: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
}

export const privacyPolicy: LegalDocument = {
  title: 'Privacy Policy',
  slug: 'privacy',
  seoTitle: 'Privacy Policy',
  metaDescription:
    'How Visio Solutions Inc. handles information submitted through this website, including contact-form data, server logs, cookies, and your rights. Draft pending legal review.',
  lastUpdated: '2026-07-01',
  intro: [
    `This Privacy Policy explains how ${company.name} ("we", "us") handles information in connection with this website. We aim to collect only what we need and to be transparent about it.`,
  ],
  sections: [
    {
      heading: 'Information we collect',
      paragraphs: ['We collect information in the following limited ways:'],
      list: [
        'Contact-form data you choose to submit: your name, work email, company, optional phone number, and details about your project.',
        'Server logs automatically generated when you visit, which may include IP address, browser type, and pages requested, used for security and reliability.',
        'Analytics data, only if privacy-conscious analytics is enabled. Where enabled, it is configured to avoid collecting personal form content.',
      ],
    },
    {
      heading: 'How we use information',
      list: [
        'To respond to and evaluate your inquiry.',
        'To operate, secure, and improve the website.',
        'To comply with legal obligations where applicable.',
      ],
      paragraphs: ['We do not sell your personal information.'],
    },
    {
      heading: 'Cookies and analytics',
      paragraphs: [
        'This website uses only the storage necessary for essential functionality, such as remembering your theme preference. If non-essential analytics or trackers are enabled in future, this policy and our Cookie Policy will be updated and appropriate consent will be handled where legally required.',
      ],
    },
    {
      heading: 'Third-party processors',
      paragraphs: [
        'We may use third-party service providers to host the website and to deliver contact-form notifications (for example, an email delivery provider). These providers process data on our behalf under their own terms. The specific processors in use will be confirmed and listed here before launch.',
      ],
    },
    {
      heading: 'Data retention',
      paragraphs: [
        'We retain contact submissions only as long as needed to respond to and evaluate your inquiry, and as required for legitimate business or legal purposes. A specific retention period will be confirmed with counsel before launch.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        'Depending on your location, you may have rights to access, correct, or delete your personal information, or to object to certain processing. To make a request, contact us using the details below. We will respond consistent with applicable law.',
      ],
    },
    {
      heading: 'International visitors',
      paragraphs: [
        'This website is operated from the United States. If you access it from outside the United States, your information may be processed in the United States, where data-protection laws may differ from those in your location.',
      ],
    },
    {
      heading: 'Security and its limits',
      paragraphs: [
        'We use reasonable technical and organizational measures to protect information, including input validation and secure handling of submissions. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
      ],
    },
    {
      heading: 'Contact',
      paragraphs: [
        `For privacy questions or requests, contact ${company.name} at ${company.email}, or by mail at ${formattedAddress}.`,
      ],
    },
  ],
};

export const termsOfUse: LegalDocument = {
  title: 'Terms of Use',
  slug: 'terms',
  seoTitle: 'Terms of Use',
  metaDescription:
    'The terms governing use of the Visio Solutions Inc. website, including intellectual property, acceptable use, and disclaimers. Draft pending legal review.',
  lastUpdated: '2026-07-01',
  intro: [
    `These Terms of Use govern your use of this website operated by ${company.name}. By using the website, you agree to these terms. If you do not agree, please do not use the website.`,
  ],
  sections: [
    {
      heading: 'Informational use',
      paragraphs: [
        'This website is provided for general informational purposes about our services. Its content does not constitute technical, legal, financial, or professional advice, and should not be relied upon as such.',
      ],
    },
    {
      heading: 'Intellectual property',
      paragraphs: [
        `Unless otherwise stated, the content, design, and materials on this website are owned by or licensed to ${company.name} and are protected by applicable intellectual-property laws. You may not reproduce or redistribute them without permission, except as permitted by law.`,
      ],
    },
    {
      heading: 'Acceptable use',
      list: [
        'Do not use the website in any way that is unlawful or could damage, disable, or impair it.',
        'Do not attempt to gain unauthorized access to any part of the website or related systems.',
        'Do not submit content that is unlawful, abusive, or infringes the rights of others.',
      ],
    },
    {
      heading: 'No warranty',
      paragraphs: [
        'The website is provided on an "as is" and "as available" basis, without warranties of any kind, whether express or implied, to the fullest extent permitted by law. We do not warrant that the website will be uninterrupted, error-free, or free of harmful components.',
      ],
    },
    {
      heading: 'Limitation of liability',
      paragraphs: [
        'To the fullest extent permitted by law, we will not be liable for any indirect, incidental, or consequential damages arising from your use of the website. The specific limitation-of-liability language will be confirmed with counsel before launch.',
      ],
    },
    {
      heading: 'External links',
      paragraphs: [
        'The website may link to third-party sites. We are not responsible for the content, policies, or practices of those sites, and links do not imply endorsement.',
      ],
    },
    {
      heading: 'Governing law',
      paragraphs: [
        'These terms will be governed by the laws of a jurisdiction to be confirmed with counsel before launch. This placeholder must be finalized prior to publication.',
      ],
    },
    {
      heading: 'Changes to these terms',
      paragraphs: [
        'We may update these terms from time to time. Continued use of the website after changes take effect constitutes acceptance of the revised terms.',
      ],
    },
    {
      heading: 'Contact',
      paragraphs: [`Questions about these terms can be sent to ${company.email}.`],
    },
  ],
};

export const cookiePolicy: LegalDocument = {
  title: 'Cookie Policy',
  slug: 'cookies',
  seoTitle: 'Cookie Policy',
  metaDescription:
    'How this website uses cookies and local storage. This site uses only essential storage by default. Draft pending legal review.',
  lastUpdated: '2026-07-01',
  intro: [
    'This Cookie Policy explains how this website uses cookies and similar storage technologies. We keep this minimal and accurate — we describe only what is actually used.',
  ],
  sections: [
    {
      heading: 'Essential storage',
      paragraphs: [
        'This website uses a small amount of local storage in your browser to remember your theme preference (light or dark). This is essential for the interface to work as you expect and does not track you across sites.',
      ],
    },
    {
      heading: 'Analytics cookies',
      paragraphs: [
        'By default, this website does not load analytics or advertising cookies. If privacy-conscious analytics is enabled in future, it is chosen to avoid using invasive cookies and to avoid collecting personal information. This policy will be updated to reflect any change, and consent will be handled where legally required.',
      ],
    },
    {
      heading: 'Preference storage',
      paragraphs: [
        'Preference storage, such as your theme choice, remains on your device and can be cleared at any time through your browser settings.',
      ],
    },
    {
      heading: 'Managing storage and consent',
      paragraphs: [
        'You can clear or block cookies and local storage through your browser settings. Because this website currently uses only essential storage, no consent banner is shown; a manipulative or unnecessary banner would not serve you. If non-essential trackers are introduced, an appropriate consent mechanism will be added.',
      ],
    },
    {
      heading: 'Contact',
      paragraphs: [`Questions about this policy can be sent to ${company.email}.`],
    },
  ],
};

export const legalDocuments = [privacyPolicy, termsOfUse, cookiePolicy];
