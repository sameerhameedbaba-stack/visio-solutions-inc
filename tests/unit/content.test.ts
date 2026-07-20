import { describe, expect, it } from 'vitest';
import { getService, pillars, services, serviceSlugs } from '@/content/services';
import { solutions } from '@/content/solutions';
import { articles } from '@/content/insights';
import { illustrativeUseCases } from '@/content/site';
import { company, formattedAddress, siteUrl } from '@/content/company';
import { ctas } from '@/content/ctas';
import { footerColumns } from '@/content/navigation';

describe('official company information', () => {
  it('uses the exact official details', () => {
    expect(company.name).toBe('Visio Solutions Inc.');
    expect(company.email).toBe('support@visiosolutions.net');
    expect(company.domain).toBe('visiosolutions.net');
    expect(formattedAddress).toContain('4675 Commercial Street SE, PMB #470');
    expect(formattedAddress).toContain('Salem, Oregon 97302');
  });

  it('derives a canonical site URL without a trailing slash', () => {
    expect(siteUrl.endsWith('/')).toBe(false);
    expect(siteUrl).toContain('visiosolutions.net');
  });
});

describe('services content', () => {
  it('has seven services with unique slugs', () => {
    expect(services).toHaveLength(7);
    expect(new Set(serviceSlugs).size).toBe(7);
  });

  it('assigns every service to a known pillar', () => {
    const pillarIds = new Set(pillars.map((p) => p.id));
    for (const service of services) {
      expect(pillarIds.has(service.pillar)).toBe(true);
    }
  });

  it('gives every service the fields required by the page template', () => {
    for (const service of services) {
      expect(service.title.length).toBeGreaterThan(0);
      expect(service.seoTitle.length).toBeGreaterThan(0);
      expect(service.metaDescription.length).toBeGreaterThan(50);
      expect(service.headline.length).toBeGreaterThan(0);
      expect(service.businessProblem.signals.length).toBeGreaterThan(0);
      expect(service.whenAppropriate.length).toBeGreaterThan(0);
      expect(service.includes.length).toBeGreaterThan(2);
      expect(service.useCases.length).toBeGreaterThan(0);
      expect(service.deliverables.length).toBeGreaterThan(0);
      expect(service.businessValue.length).toBeGreaterThan(0);
      expect(service.securityGovernance.length).toBeGreaterThan(0);
      expect(service.faqs.length).toBeGreaterThan(1);
      expect(service.relatedSlugs.length).toBeGreaterThan(0);
    }
  });

  it('only references related services that exist', () => {
    for (const service of services) {
      for (const slug of service.relatedSlugs) {
        expect(getService(slug), `related slug ${slug}`).toBeDefined();
      }
    }
  });

  it('has unique meta descriptions across services (no duplication)', () => {
    const descriptions = services.map((s) => s.metaDescription);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });
});

describe('solutions content', () => {
  it('references only real services', () => {
    for (const solution of solutions) {
      for (const slug of solution.relatedServiceSlugs) {
        expect(getService(slug)).toBeDefined();
      }
    }
  });
});

describe('insights content', () => {
  it('uses the organization as author (no invented people)', () => {
    for (const article of articles) {
      expect(article.author).toBe('Visio Solutions Inc.');
      expect(article.body.length).toBeGreaterThan(4);
    }
  });
});

describe('truth and claims policy', () => {
  it('provides illustrative use cases without numeric outcomes', () => {
    expect(illustrativeUseCases.length).toBeGreaterThanOrEqual(3);
    for (const useCase of illustrativeUseCases) {
      // Guard against fabricated metrics like "40%" or "$1M" in the value line.
      expect(useCase.value).not.toMatch(/\d+\s?%/);
      expect(useCase.value).not.toMatch(/\$\s?\d/);
    }
  });
});

describe('CTA registry', () => {
  it('routes the primary CTA to contact with a strategy-call intent', () => {
    expect(ctas.strategyCall.href).toContain('/contact');
    expect(ctas.strategyCall.label.toLowerCase()).toContain('strategy call');
  });
});

describe('footer', () => {
  it('links every service and all legal pages', () => {
    const allLinks = footerColumns.flatMap((c) => c.links.map((l) => l.href));
    for (const slug of serviceSlugs) {
      expect(allLinks).toContain(`/services/${slug}`);
    }
    expect(allLinks).toContain('/privacy');
    expect(allLinks).toContain('/terms');
    expect(allLinks).toContain('/cookies');
  });
});
