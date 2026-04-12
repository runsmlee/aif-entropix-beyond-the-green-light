import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '../components/Footer';

describe('Footer', () => {
  it('renders the brand name', () => {
    render(<Footer />);
    // There are multiple "Entropix" elements (header link + footer)
    const brandLinks = screen.getAllByLabelText('Entropix home');
    expect(brandLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('renders footer link groups', () => {
    render(<Footer />);
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
  });

  it('renders footer links under Product', () => {
    render(<Footer />);
    expect(screen.getByText('Changelog')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
  });

  it('renders footer links under Resources', () => {
    render(<Footer />);
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('API Reference')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Community')).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<Footer />);
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
  });

  it('renders the copyright with current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    const copyright = screen.getByText(`© ${year} Entropix. All rights reserved.`);
    expect(copyright).toBeInTheDocument();
  });

  it('has contentinfo role', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
});
