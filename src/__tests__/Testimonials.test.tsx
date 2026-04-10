import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Testimonials } from '../components/Testimonials';

describe('Testimonials', () => {
  it('renders the section heading', () => {
    render(<Testimonials />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toContain('Trusted by teams');
  });

  it('renders all three testimonial quotes', () => {
    render(<Testimonials />);
    expect(screen.getByText(/cascading failure/)).toBeInTheDocument();
    expect(screen.getByText(/on-call team/)).toBeInTheDocument();
    expect(screen.getByText(/entropy heat map/)).toBeInTheDocument();
  });

  it('renders author names and companies', () => {
    render(<Testimonials />);
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Marcus Rivera')).toBeInTheDocument();
    expect(screen.getByText('Aisha Patel')).toBeInTheDocument();
    expect(screen.getByText(/StreamPay/)).toBeInTheDocument();
    expect(screen.getByText(/DataForge/)).toBeInTheDocument();
    expect(screen.getByText(/Nextera/)).toBeInTheDocument();
  });
});
