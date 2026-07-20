import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FAQSection } from '@/components/marketing/FAQSection';
import { UseCaseCard } from '@/components/marketing/UseCaseCard';
import { Button } from '@/components/ui/Button';
import { illustrativeUseCases } from '@/content/site';

describe('Button', () => {
  it('renders as a link when href is provided', () => {
    render(<Button href="/contact">Contact</Button>);
    const link = screen.getByRole('link', { name: 'Contact' });
    expect(link).toHaveAttribute('href', '/contact');
  });

  it('renders as a button element otherwise', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});

describe('UseCaseCard', () => {
  it('always shows the illustrative label', () => {
    render(<UseCaseCard useCase={illustrativeUseCases[0]!} />);
    expect(screen.getByText(/illustrative use case/i)).toBeInTheDocument();
  });
});

describe('FAQSection', () => {
  const faqs = [
    { question: 'First question?', answer: 'First answer.' },
    { question: 'Second question?', answer: 'Second answer.' },
  ];

  it('renders questions as keyboard-operable buttons with aria-expanded', () => {
    render(<FAQSection faqs={faqs} />);
    const first = screen.getByRole('button', { name: 'First question?' });
    // First item is open by default.
    expect(first).toHaveAttribute('aria-expanded', 'true');
    const second = screen.getByRole('button', { name: 'Second question?' });
    expect(second).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles panels on interaction', async () => {
    const user = userEvent.setup();
    render(<FAQSection faqs={faqs} />);
    const second = screen.getByRole('button', { name: 'Second question?' });
    await user.click(second);
    expect(second).toHaveAttribute('aria-expanded', 'true');
    // Opening the second closes the first (single-open pattern).
    const first = screen.getByRole('button', { name: 'First question?' });
    expect(first).toHaveAttribute('aria-expanded', 'false');
  });
});
