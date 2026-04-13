import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Testimonials } from '../components/Testimonials';

describe('Testimonials', () => {
  it('renders the section heading', () => {
    render(<Testimonials />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toContain('What entropy monitoring catches');
  });

  it('renders all three scenario titles', () => {
    render(<Testimonials />);
    expect(screen.getByText('Memory leak masking')).toBeInTheDocument();
    expect(screen.getByText('Flapping service')).toBeInTheDocument();
    expect(screen.getByText('Silent data corruption')).toBeInTheDocument();
  });

  it('renders detection time comparisons', () => {
    render(<Testimonials />);
    expect(screen.getByText('4 hours before failure')).toBeInTheDocument();
    expect(screen.getByText('8 minutes')).toBeInTheDocument();
    expect(screen.getByText('Before data loss')).toBeInTheDocument();
  });

  it('renders traditional monitoring comparisons', () => {
    render(<Testimonials />);
    expect(screen.getByText('At crash — no warning')).toBeInTheDocument();
    expect(screen.getByText('3+ hours')).toBeInTheDocument();
    expect(screen.getByText('After user reports')).toBeInTheDocument();
  });

  it('renders scenario descriptions', () => {
    render(<Testimonials />);
    expect(screen.getByText(/heap allocation metrics/)).toBeInTheDocument();
    expect(screen.getByText(/High-frequency entropy/)).toBeInTheDocument();
    expect(screen.getByText(/database write patterns/)).toBeInTheDocument();
  });

  it('has the correct section id for navigation', () => {
    render(<Testimonials />);
    const section = screen.getByRole('heading', { level: 2 }).closest('section');
    expect(section).toHaveAttribute('id', 'testimonials');
  });
});
