import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from '../components/Header';

describe('Header', () => {
  it('renders the brand name', () => {
    render(<Header mobileMenuOpen={false} onToggleMobileMenu={() => {}} />);
    expect(screen.getByText('Entropix')).toBeInTheDocument();
  });

  it('renders the home link', () => {
    render(<Header mobileMenuOpen={false} onToggleMobileMenu={() => {}} />);
    const homeLink = screen.getByLabelText('Entropix home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders navigation items', () => {
    render(<Header mobileMenuOpen={false} onToggleMobileMenu={() => {}} />);
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('How It Works')).toBeInTheDocument();
    expect(screen.getByText('Metrics')).toBeInTheDocument();
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('renders the Get Started CTA button', () => {
    render(<Header mobileMenuOpen={false} onToggleMobileMenu={() => {}} />);
    const cta = screen.getByText('Get Started');
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute('href', '#cta');
  });

  it('renders mobile menu button with correct aria attributes', () => {
    render(<Header mobileMenuOpen={false} onToggleMobileMenu={() => {}} />);
    const menuButton = screen.getByLabelText('Open menu');
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
  });

  it('toggles mobile menu aria attributes when opened', () => {
    render(<Header mobileMenuOpen={true} onToggleMobileMenu={() => {}} />);
    const closeButton = screen.getByLabelText('Close menu');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('calls onToggleMobileMenu when mobile button clicked', () => {
    let clicked = false;
    const handleClick = () => { clicked = true; };
    render(<Header mobileMenuOpen={false} onToggleMobileMenu={handleClick} />);
    const menuButton = screen.getByLabelText('Open menu');
    fireEvent.click(menuButton);
    expect(clicked).toBe(true);
  });

  it('shows mobile navigation when mobileMenuOpen is true', () => {
    render(<Header mobileMenuOpen={true} onToggleMobileMenu={() => {}} />);
    const mobileNav = screen.getByLabelText('Mobile navigation');
    expect(mobileNav).toBeInTheDocument();
  });
});
