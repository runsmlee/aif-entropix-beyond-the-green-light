import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CTA } from '../components/CTA';

describe('CTA', () => {
  it('renders the section heading', () => {
    render(<CTA />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toContain('beyond the green light');
  });

  it('renders the email input', () => {
    render(<CTA />);
    const emailInput = screen.getByLabelText('Email address');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('required');
  });

  it('renders the submit button', () => {
    render(<CTA />);
    const submitButton = screen.getByRole('button', { name: 'Start Free Trial' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('renders the trust message', () => {
    render(<CTA />);
    expect(screen.getByText(/Free 14-day trial/)).toBeInTheDocument();
    expect(screen.getByText(/No credit card required/)).toBeInTheDocument();
  });

  it('has the correct section id for navigation', () => {
    render(<CTA />);
    const section = screen.getByRole('heading', { level: 2 }).closest('section');
    expect(section).toHaveAttribute('id', 'cta');
  });
});
